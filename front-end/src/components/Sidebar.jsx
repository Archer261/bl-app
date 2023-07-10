import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Sidebar({ participants, organizer, isOrganizer, setParticipants }) {
    const [open, setOpen] = useState(false);


    const onClickRemove = (e) => {
        const updatedData = participants.filter(p => p._id !== e.target.id);
    }

    return (
        <>
            {!open && (
                <button
                    type="button"
                    className="fixed bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
                    onClick={() => setOpen(true)}
                >
                    Details
                </button>
            )}

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="absolute inset-y-0 left-0 max-w-full flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform ease-in-out duration-300"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <div className="relative w-screen max-w-md">
                                    <div className="h-full flex flex-col bg-white shadow-xl">
                                        <div className="px-4 py-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-lg font-semibold">Challenge Details</Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-2 px-4 py-2 overflow-y-auto">
                                            <h2 className='font-bold text-xl'>Organizer(s):</h2>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                    <thead className="ltr:text-left rtl:text-right">
                                                        <tr>
                                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                Name
                                                            </th>
                                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

                                                            </th>

                                                            <th className="px-4 py-2"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr>
                                                            <td className="whitespace-nowrap px-4 py-2">
                                                                <div
                                                                    className="inline-block rounded px-4 py-2 text-xs font-medium text-white"
                                                                >
                                                                    <img className="w-8 h-8 rounded-full" src={organizer.profileImage} alt='Organizer' />
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                {organizer.firstName} {organizer.lastName}
                                                            </td>
                                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>


                                                            <td className="whitespace-nowrap px-4 py-2">
                                                                <Link
                                                                    to={''}
                                                                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                                >
                                                                    View
                                                                </Link>

                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-4 py-2 overflow-y-auto">
                                            <h2 className='font-bold text-xl'>Participants:</h2>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                    <thead className="ltr:text-left rtl:text-right">
                                                        <tr>
                                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                Name
                                                            </th>
                                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

                                                            </th>

                                                            <th className="px-4 py-2"></th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-gray-200">
                                                        {participants ? participants.map((p, i) => (


                                                            <tr key={p._id}>
                                                                <td className="whitespace-nowrap px-4 py-2">
                                                                    <div
                                                                        className="inline-block rounded px-4 py-2 text-xs font-medium text-white"
                                                                    >
                                                                        <img className="w-8 h-8 rounded-full" src={p.user.profileImage} alt={p.user.username} />
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    {p.user.firstName} {p.user.lastName}
                                                                </td>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>


                                                                <td className="whitespace-nowrap px-4 py-2">
                                                                    <Link
                                                                        to={`/users/${p.user._id}`}
                                                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                                    >
                                                                        View
                                                                    </Link>
                                                                    {isOrganizer && (
                                                                        <button
                                                                            id={p._id}
                                                                            className=" mx-2 inline-block  px-4 py-2 text-xs font-medium text-white "
                                                                            onClick={onClickRemove}
                                                                        >
                                                                            <svg width="24px" height="px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12ZM8.25 11.25C7.83579 11.25 7.5 11.5858 7.5 12C7.5 12.4142 7.83579 12.75 8.25 12.75L15.75 12.75C16.1642 12.75 16.5 12.4142 16.5 12C16.5 11.5858 16.1642 11.25 15.75 11.25L8.25 11.25Z" fill="#dc2626" />
                                                                            </svg>

                                                                        </button>)
                                                                    }
                                                                </td>
                                                            </tr>

                                                        )) : (<></>)}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
        </>
    );
}
