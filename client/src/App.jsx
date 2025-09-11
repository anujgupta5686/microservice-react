// src/App.jsx
import React from "react";

import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./components/ui/dropdown-menu";
import { Checkbox } from "./components/ui/checkbox";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold text-center">Shadcn-UI Test</h1>

        {/* Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>

        {/* Select */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Checkbox + Switch */}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept Terms</Label>
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable Notifications</Label>
          <Switch defaultChecked />
        </div>

        {/* Button */}
        <Button className="w-full">Submit</Button>
      </div>
    </div>
  );
}
