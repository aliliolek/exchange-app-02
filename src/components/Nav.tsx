'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';
import { SearchIcon } from '@/components/icons';

import {
  ArrowDownCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase-config';
import { use } from 'react';
import useAuth from '@/hooks/useAuth';
import signOutUser from '@/services/auth/authFunctions';

export const Nav = () => {
  const user = useAuth();
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <ArrowDownCircleIcon className="w-8 h-8" />
            <p className="font-bold text-inherit">EX</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(linkStyles({ color: 'foreground' }), {
                  'text-blue-600 bg-red': pathname === item.href,
                })}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        {user && (
          <NavbarMenuItem>
            <Link
              href="/profile"
              color="foreground"
              className={linkStyles({ color: 'foreground' })}
            >
              <Button
                color="primary"
                variant="light"
                endContent={
                  user.email ? (
                    <p className="font-semibold">{user.email}</p>
                  ) : (
                    ''
                  )
                }
              >
                <UserCircleIcon className="w-6 h-6" />
              </Button>
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        {user && (
          <NavbarMenuItem>
            <Button color="primary" variant="bordered" onClick={signOutUser}>
              Sign Out
            </Button>
          </NavbarMenuItem>
        )}
        {!user && (
          <>
            <NavbarMenuItem>
              <Link href="/login" size="lg">
                <Button color="primary" variant="solid">
                  Log in
                </Button>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/register" size="lg">
                <Button color="primary" variant="bordered">
                  Sign up
                </Button>
              </Link>
            </NavbarMenuItem>
          </>
        )}
        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      {/* <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {user ? (
              <img
                src={user.photoURL || undefined} // Використовуйте зображення користувача, якщо воно є
                alt="User photo"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-8 w-8" /> // Іконка користувача, якщо зображення відсутнє
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {user ? (
              <>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={() => signOut(auth)}
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </>
            ) : (
              <DropdownItem key="login" onClick={signInWithGoogle}>
                Login
              </DropdownItem> // Показати опцію входу, якщо користувач не увійшов
            )}
           
          </DropdownMenu>
        </Dropdown>
        
      </NavbarContent> */}

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(linkStyles({ color: 'foreground' }), {
                  'text-blue-600': pathname === item.href,
                })}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
