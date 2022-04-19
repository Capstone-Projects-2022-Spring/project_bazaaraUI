import React from 'react'

const List = ({label,price}) => {
    return (
        <>
            <main className="flex justify-evenly items-center p-3 w-full">
                <div className="">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.48438 12.381L12.5781 19.7857L17.5312 12.3929C17.3594 12.2976 17.2031 12.2024 17.0625 12.0952C15.75 12.7262 14.1719 13.0952 12.5 13.0952C10.8281 13.0952 9.25 12.7262 7.9375 12.0952C7.79688 12.2024 7.64062 12.2976 7.48438 12.381ZM4.42188 13.0833C1.95312 12.9762 0 11.4286 0 9.52381C0 7.75 1.70312 6.27381 3.9375 6C4.29688 2.64286 8 0 12.5 0C17 0 20.7031 2.64286 21.0625 6C23.2969 6.27381 25 7.75 25 9.52381C25 11.4167 23.0625 12.9762 20.6094 13.0833L12.6094 25L4.42188 13.0833Z" fill="black" />
                    </svg>
                </div>
                <div className="text-bold">
                    {label}
                </div>
                <div>
                ${price}
                </div>
            </main>
        </>
    )
}

export default List