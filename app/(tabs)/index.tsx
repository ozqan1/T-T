import { DownloaderScreen } from '@/components/DownloaderScreen';
import { PLATFORMS } from '@/constants/platforms';

export default function TikTokTab() {
  return <DownloaderScreen platform={PLATFORMS.tiktok} />;
}
