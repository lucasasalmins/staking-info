'use client'

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard({ children }) {

  return (
    <>
      <div>
        <div >
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}


// <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
// 
//   {/* Separator */}
//   <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
// 
//   <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
//     <form className="relative flex flex-1" action="#" method="GET">
//       <label htmlFor="search-field" className="sr-only">
//         solana address...
//       </label>
//       <MagnifyingGlassIcon
//         className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
//         aria-hidden="true"
//       />
//       <input
//         id="search-field"
//         className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
//         placeholder="solana address..."
//         type="search"
//         name="search"
//       />
//     </form>
//   </div>
// </div>