// ALTCHA challenge generation endpoint
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    // Generate a random salt
    const salt = crypto.randomBytes(12).toString('base64');

    // Random number to find (the solution)
    const secretNumber = Math.floor(Math.random() * 100000);

    // Max number to search (difficulty - lower = harder)
    const maxNumber = 100000;

    // Create the challenge hash
    const challenge = crypto
      .createHash('sha256')
      .update(salt + secretNumber.toString())
      .digest('hex');

    // Return challenge in ALTCHA format
    return NextResponse.json({
      algorithm: 'SHA-256',
      challenge,
      maxnumber: maxNumber,
      salt,
      signature: '' // Optional HMAC signature for verification
    });
  } catch (error) {
    console.error('Error generating ALTCHA challenge:', error);
    return NextResponse.json(
      { error: 'Failed to generate challenge' },
      { status: 500 }
    );
  }
}
