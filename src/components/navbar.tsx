"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo, LogIn, LogOut } from "@/components/icons";
import { useEffect, useState } from "react";
import { APIUser } from "@/lib/API";
import { User } from "@/types";

export const Navbar = () => {
  const { data, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [user, setUser] = useState<User>()
  useEffect(()=>{
    data?.user?.id && APIUser.get(data.user.id).then(user => setUser(user))
  },[])
  const userName = user?.name || user?.email


  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Логотип и основные пункты */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      {isAuthenticated ? (
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItemsLogInUser.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      ) : (
        <></>
      )}

      {/* Правая часть: действия пользователя */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {isAuthenticated ? (
          // Если пользователь вошёл — показываем кнопку выхода или профиль
          <>
            <NavbarItem className="hidden sm:flex gap-2">
              <ThemeSwitch />
            </NavbarItem>
            <NavbarItem className="hidden sm:flex gap-2">
              {userName}
            </NavbarItem>
            <NavbarItem>
              <Button
                size="sm"
                variant="flat"
                endContent={<LogOut />}
                onPress={() => signOut({ callbackUrl: "/" })}
              >
                Выход
              </Button>
            </NavbarItem>
          </>
        ) : (
          // Если не вошёл — показываем кнопку входа
          <>
            <NavbarItem className="hidden sm:flex gap-2">
              <ThemeSwitch />
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/login">
                <Button size="sm" color="primary" endContent={<LogIn />}>
                  Вход
                </Button>
              </NextLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Мобильная версия: логин/выход */}
      <NavbarContent justify="end" className="sm:hidden">
        {isAuthenticated ? (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => signOut({ callbackUrl: "/" })}
          >
            <LogIn className="rotate-180" />
          </Button>
        ) : (
          <NextLink href="/login">
            <Button isIconOnly size="sm" color="primary">
              <LogIn />
            </Button>
          </NextLink>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
