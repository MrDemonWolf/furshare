import Stats from "@/components/app/stats";

import AppLayout from "~/components/layouts/app";
import UserActionLog from "@/components/app/action-log";

export default function AppPage() {
  return (
    <AppLayout>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">User Dashboard</h1>
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Stats
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700">
                  <div className="p-6">
                    <Stats />
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6 text-black">
                    <h1 className="mb-4 text-2xl font-bold">Action Log</h1>
                    <UserActionLog />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
