"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Wallet, User, Menu, X, Sparkles } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">AnimeVault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
            Marketplace
          </Link>
          <Link href="/create" className="text-sm font-medium hover:text-primary transition-colors">
            Tokenize
          </Link>
          <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors">
            Collections
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search anime NFTs..." className="pl-10" />
          </div>
        </div>

        {/* Wallet & User Actions */}
        <div className="flex items-center space-x-2">
          {isWalletConnected ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Wallet className="h-4 w-4 mr-2" />
                0x1234...5678
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsWalletConnected(true)} className="hidden md:flex">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search anime NFTs..." className="pl-10" />
            </div>

            <nav className="flex flex-col space-y-2">
              <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Marketplace
              </Link>
              <Link href="/create" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Tokenize
              </Link>
              <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Collections
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Dashboard
              </Link>
            </nav>

            {!isWalletConnected && (
              <Button onClick={() => setIsWalletConnected(true)} className="w-full">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
