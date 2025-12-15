"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AssignmentItem } from "@/features/assignments/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Plus, Edit, Trash2, FileText, Calendar, AlertCircle, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadAssignments = async () => {
    setError(null);
    try {
      const res = await fetch("/api/assignments", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAssignments(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load assignments";
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this assignment?")) return;

    try {
      const res = await fetch(`/api/assignments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d?.error || "Delete failed");
      }

      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      alert(message);
    }
  };

const formatDate = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};


  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Assignments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your course assignments</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setRefreshing(true); loadAssignments(); }}
            disabled={refreshing}
            className="h-9"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin mr-2' : 'mr-2'}`} />
            {refreshing ? "Refreshing" : "Refresh"}
          </Button>

          <Button asChild size="sm" className="h-9">
            <Link href="/teacher/assignments/new">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Link>
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full mt-2" />
                <Skeleton className="h-3 w-2/3 mt-1" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : assignments.length === 0 ? (
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
              <p className="text-gray-500 mb-4 text-sm">Create your first assignment to get started</p>
              <Button asChild size="sm">
                <Link href="/teacher/assignments/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((a) => (
            <Card key={a.id} className=" flex flex-col hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base line-clamp-2">{a.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 -mt-1 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/teacher/assignments/${a.id}/edit`} className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(a.id)}
                        className="text-red-600 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 text-xs">
                  {a.description || "No description provided"}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span>Created: {formatDate(a.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
