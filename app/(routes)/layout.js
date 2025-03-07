// app/(dashboard)/layout.js
import { PageTransition } from '@/components/PageTransition';

export default function DashboardLayout({ children }) {
  return (
    <PageTransition>
      <div className="ml-0 md:ml-64">
        {children}
      </div>
    </PageTransition>
  );
}