"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SearchIcon from '../icon/SearchIcon'
import { Button } from '../ui/button'
import Container from './Container'
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteCookie } from "cookies-next"
import UserIcon from '../icon/UserIcon';
import { useRouter } from "next/navigation"
import { logOut } from '@/store/features/authSlice';


const Header = () => {
    const [activeBackground, setActiveBackground] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    //scroll color change handle
    useEffect(() => {
        window.addEventListener("scroll", changeNavbarBackground)
        return () => window.removeEventListener('scroll', changeNavbarBackground);
    }, [])

    const auth = useAppSelector((state) => state.auth.user)

    // navbar scroll background color change
    const changeNavbarBackground = () => {

        if (window.scrollY >= 50) {
            setActiveBackground(true)
        } else {
            setActiveBackground(false)

        }
    }

    //logout
    const handleLogOut = () => {
        dispatch(logOut());
        deleteCookie("access_token");
        router.push("/sign-in");

    }

    return (
        <Container className={`fixed w-full z-50 ${activeBackground ? "bg-black/95" : null}`}>
            <header className=' z-50 flex items-center justify-between py-4'>
                {/* logo start from here */}
                <div className="text-xl font-bold text-blue-500">MOVIE <sub className='text-xs font-medium text-white'>.COM</sub> </div>

                {/* search bar start from here */}
                <div className="w-[500px]  p-1 bg-white rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="px-1">
                            <SearchIcon className='w-5 h-5 text-gray-500' />
                        </div>
                        <input type="search" placeholder='Search movies' className=' flex-1 text-sm outline-none' />

                        {/* search select start from here */}
                        <Select defaultValue='EN'>
                            <SelectTrigger className="w-[76px] h-8  text-black font-semibold  bg-gray-200 border-none rounded-lg">
                                <SelectValue placeholder="EN" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup >
                                    <SelectItem value="EN" >All</SelectItem>
                                    <SelectItem value="banana">Entertainment</SelectItem>
                                    <SelectItem value="blueberry">Action</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* menu bar start from here */}
                <menu className='flex items-center gap-5 text-sm text-white'>
                    <Link href="/">Home</Link>
                    <Link href="#">Movies</Link>
                    <Link href="#">Watch-list</Link>

                    {/* language select start from here */}
                    <Select defaultValue='EN'>
                        <SelectTrigger className="w-[70px] bg-gradient-to-r from-cyan-500 to-blue-700 border-none rounded-full">
                            <SelectValue placeholder="EN" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup >
                                <SelectItem value="EN" >EN</SelectItem>
                                <SelectItem value="banana">ENG</SelectItem>
                                <SelectItem value="blueberry">US</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* profile start from here */}
                    {auth ? <DropdownMenu>
                        <DropdownMenuTrigger >
                            <UserIcon className='w-5 h-5 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='!mt-2.5'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu> : <Button asChild className='hover:bg-blue-700 bg-blue-500' size="sm">
                        <Link href="/sign-in">Sign In</Link>
                    </Button>}



                </menu>
            </header>
        </Container >
    )
}

export default Header