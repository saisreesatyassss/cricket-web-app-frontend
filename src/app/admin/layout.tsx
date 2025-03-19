import AdminHeader from '@/components/admin/header';
import AdminFooter from '@/components/admin/footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow ">
        {children}
      </main>
      <AdminFooter />
    </div>
  );
}