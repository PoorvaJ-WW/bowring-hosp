// utils/logger.ts
import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const AI_LOG_FILE = 'ai-interactions.log';
const STRUCTURE_LOG_FILE = 'site-structures.log';
const ERROR_LOG_FILE = 'errors.log';

// Ensure log directory exists
async function ensureLogDir() {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create log directory:', error);
  }
}

export interface LogEntry {
  timestamp: string;
  siteId: string;
  type: 'request' | 'response' | 'error' | 'structure';
  data: any;
}

export async function logAiInteraction(entry: LogEntry) {
  await ensureLogDir();
  
  const logPath = path.join(LOG_DIR, AI_LOG_FILE);
  const logLine = JSON.stringify(entry) + '\n';
  
  try {
    await fs.appendFile(logPath, logLine);
    
    // Also log to console for debugging
    console.log(`[AI ${entry.type.toUpperCase()}]`, {
      siteId: entry.siteId,
      timestamp: entry.timestamp,
      summary: entry.type === 'request' 
        ? entry.data.instruction 
        : entry.type === 'response' 
          ? (entry.data.result?.substring(0, 100) + '...') 
          : entry.data
    });
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
}

export async function logSiteStructure(siteId: string, structure: any) {
  await ensureLogDir();
  
  const logPath = path.join(LOG_DIR, `${siteId}-structure.json`);
  
  try {
    await fs.writeFile(logPath, JSON.stringify(structure, null, 2));
    console.log(`[SITE STRUCTURE] Saved structure for ${siteId} to ${logPath}`);
    
    // Also append to the main structure log
    const mainLogPath = path.join(LOG_DIR, STRUCTURE_LOG_FILE);
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      siteId,
      type: 'structure',
      data: {
        overview: structure.overview,
        fileCount: Object.keys(structure.fileSummaries || {}).length,
        keyFiles: structure.overview?.keyFiles?.slice(0, 10) // First 10 files
      }
    };
    
    await fs.appendFile(mainLogPath, JSON.stringify(entry) + '\n');
  } catch (error) {
    console.error('Failed to log site structure:', error);
  }
}

export async function logError(siteId: string, error: any, context?: string) {
  await ensureLogDir();
  
  const logPath = path.join(LOG_DIR, ERROR_LOG_FILE);
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    siteId,
    type: 'error',
    data: {
      message: error.message,
      stack: error.stack,
      context,
      code: error.code
    }
  };
  
  try {
    await fs.appendFile(logPath, JSON.stringify(entry) + '\n');
    console.error(`[ERROR] ${context || 'Unknown context'}:`, error.message);
  } catch (logError) {
    console.error('Failed to write error to log file:', logError);
  }
}

// Function to read logs for debugging
export async function readLogs(logType: 'ai' | 'structure' | 'error', lines: number = 50) {
  const logFile = logType === 'ai' ? AI_LOG_FILE 
    : logType === 'structure' ? STRUCTURE_LOG_FILE 
    : ERROR_LOG_FILE;
    
  const logPath = path.join(LOG_DIR, logFile);
  
  try {
    const content = await fs.readFile(logPath, 'utf-8');
    const allLines = content.trim().split('\n');
    const recentLines = allLines.slice(-lines);
    
    return recentLines.map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return line;
      }
    });
  } catch (error) {
    console.error(`Failed to read ${logFile}:`, error);
    return [];
  }
}

// Clean old logs
export async function cleanOldLogs(daysToKeep: number = 7) {
  await ensureLogDir();
  
  const now = Date.now();
  const maxAge = daysToKeep * 24 * 60 * 60 * 1000;
  
  try {
    const files = await fs.readdir(LOG_DIR);
    
    for (const file of files) {
      const filePath = path.join(LOG_DIR, file);
      const stats = await fs.stat(filePath);
      
      if (now - stats.mtime.getTime() > maxAge) {
        await fs.unlink(filePath);
        console.log(`[CLEANUP] Deleted old log: ${file}`);
      }
    }
  } catch (error) {
    console.error('Failed to clean old logs:', error);
  }
}