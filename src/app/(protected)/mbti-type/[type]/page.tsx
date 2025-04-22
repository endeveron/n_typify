import MBTITypeClient from '@/core/components/mbti-type/mbti-type';

const Page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params;
  return <MBTITypeClient type={type} />;
};

export default Page;
