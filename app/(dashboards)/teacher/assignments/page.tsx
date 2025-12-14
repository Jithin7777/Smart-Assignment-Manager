  // app/teacher/assignments/page.tsx
  "use client";

  import { useEffect, useState } from "react";
  import Link from "next/link";
  import { AssignmentItem } from "@/features/assignments/types";

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
      const message =
        err instanceof Error ? err.message : "Failed to load assignments";
      setError(message);
    } 
  finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    useEffect(() => {
      loadAssignments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const message =
        err instanceof Error ? err.message : "Delete failed";
      alert(message);
    }
  };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Assignments</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setRefreshing(true); loadAssignments(); }}
              className="px-3 py-1 border rounded"
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <Link
              href="/teacher/assignments/new"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create New
            </Link>
          </div>
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : assignments.length === 0 ? (
          <div>No assignments yet.</div>
        ) : (
          <div className="grid gap-4">
            {assignments.map((a) => (
              <div key={a.id} className="p-4 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium">{a.title}</h2>
                    <p className="text-sm text-gray-700 mt-1">{a.description}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Link
                      href={`/teacher/assignments/${a.id}/edit`}
                      className="text-sm text-blue-600 underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
