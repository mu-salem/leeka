'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminLanguage } from '@/contexts/admin-language-context';
import { PageTransition } from '@/components/admin/page-transition';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@lekka.com',
    role: 'Admin',
    lastLogin: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@lekka.com',
    role: 'Editor',
    lastLogin: '5 hours ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@lekka.com',
    role: 'Editor',
    lastLogin: '1 day ago',
    status: 'active',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@lekka.com',
    role: 'Viewer',
    lastLogin: '3 days ago',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom.brown@lekka.com',
    role: 'Editor',
    lastLogin: '1 week ago',
    status: 'active',
  },
];

function UserRow({ user, index }: { user: User; index: number }) {
  const { t } = useAdminLanguage();

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="hover:bg-muted/50 transition-colors"
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.role === 'Admin' ? 'default' : 'secondary'}
          className="capitalize"
        >
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.status === 'active' ? 'default' : 'outline'}
          className={user.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              {t('edit')}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              {t('delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
  );
}

export default function AdminUsersPage() {
  const { t } = useAdminLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t('users')}</h1>
            <p className="text-muted-foreground mt-2">
              Manage user accounts and permissions
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">{users.length}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Users</CardDescription>
                <CardTitle className="text-3xl">
                  {users.filter(u => u.status === 'active').length}
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Admins</CardDescription>
                <CardTitle className="text-3xl">
                  {users.filter(u => u.role === 'Admin').length}
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('name')}</TableHead>
                    <TableHead>{t('role')}</TableHead>
                    <TableHead>{t('lastLogin')}</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <UserRow key={user.id} user={user} index={index} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <p className="text-muted-foreground">No users found</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
