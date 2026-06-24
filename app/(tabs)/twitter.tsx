import { DownloaderScreen } from '@/components/DownloaderScreen';
import { PLATFORMS } from '@/constants/platforms';

export default function TwitterTab() {
  return <DownloaderScreen platform={PLATFORMS.twitter} />;
}
