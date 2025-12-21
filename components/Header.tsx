'use client';

import { useState, Fragment } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Inline navigation data
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Patient Care',
    href: '/patient-care',
    children: [
      { name: 'For Patients', href: '/for-patients' },
      { name: 'For Visitors', href: '/for-visitors' },
      { name: 'Outpatient Services', href: '/outpatient-services' },
      { name: 'Inpatient Services', href: '/inpatient-services' },
      { name: 'Emergency Services', href: '/emergency-services' },
      { name: 'Appointment Booking', href: '/appointment-booking' },
      { name: 'Telemedicine', href: '/telemedicine' },
      { name: 'International Patients', href: '/international-patients' },
    ]
  },
  {
    name: 'Services',
    href: '/services-and-facilities',
    children: [
      { name: 'Departments & Specialties', href: '/departments-and-specialties' },
      { name: 'Diagnostic Services', href: '/diagnostic-services' },
      { name: 'Surgical Services', href: '/surgical-services' },
      { name: 'Maternity & Childcare', href: '/maternity-and-childcare' },
      { name: 'Blood Bank', href: '/blood-bank' },
      { name: 'Health Checkup Packages', href: '/health-checkup-packages' },
      { name: 'Government Schemes', href: '/government-schemes' },
    ]
  },
  {
    name: 'About Us',
    href: '/about',
    children: [
      { name: 'History & Heritage', href: '/history-and-heritage' },
      { name: 'Infrastructure', href: '/infrastructure' },
      { name: 'Art Centre', href: '/art-centre' },
      { name: 'Medical College', href: '/medical-college' },
      { name: 'Academics & Research', href: '/academics-and-research' },
      { name: 'Admissions', href: '/admissions' },
    ]
  },
  {
    name: 'Media',
    href: '#',
    children: [
      { name: 'News & Events', href: '/news-and-events' },
      { name: 'Events', href: '/events' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Videos', href: '/videos' },
      { name: 'Patient Testimonials', href: '/patient-testimonials' },
    ]
  },
  { name: 'Careers', href: '/career-opportunities' },
  { name: 'Contact', href: '/contact-us' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-50 bg-white shadow-sm border-b border-gray-200" role="banner">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5" aria-label="Bowring and Lady Curzon Hospital - Home">
              <span className="text-xl font-bold text-gray-900">Bowring Hospital</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              aria-label="Open main menu"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => {
              if (item.children) {
                return (
                  <Popover key={item.name} className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                          <span>{item.name}</span>
                          <ChevronDownIcon className={classNames(open ? 'rotate-180' : '', 'h-4 w-4 transition-transform')} aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-56 -translate-x-1/2 transform">
                            <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="py-2">
                                {item.children.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/appointment-booking" className="text-sm font-semibold leading-6 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Book Appointment
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xl font-bold text-gray-900">Bowring Hospital</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              aria-label="Close menu"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  if (item.children) {
                    return (
                      <Disclosure as="div" key={item.name} className="-mx-3">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              {item.name}
                              <ChevronDownIcon className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')} aria-hidden="true" />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2">
                              {item.children.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="py-6">
                <Link
                  href="/appointment-booking"
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-blue-600 text-center hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
