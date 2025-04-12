import MBTIDashboard from '@/core/components/mbti-dashboard/mbti-dashboard';

export default async function Dashboard() {
  return (
    <div className="flex flex-1">
      <MBTIDashboard langCode="en" />
    </div>
  );
}
