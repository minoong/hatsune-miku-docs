import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlipCard } from './index';

const meta: Meta<typeof FlipCard> = {
  title: 'Features/FlipCard',
  component: FlipCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🎴 마우스를 올리면 뒤집어지는 마법같은 카드! 앞면엔 예쁜 이미지, 뒷면엔 멋진 내용을 담을 수 있어요 ✨',
      },
      story: {
        overflow: 'auto',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FlipCard>
      <FlipCard.Image src="./images/miku-main.png" alt="Miku" />
      <FlipCard.Content className="bg-slate-800">
        <div className="bg-gradient-to-br from-pink-500 to-yellow-400 p-5 rounded-lg translate-z-24">
          <FlipCard.Title>✨ 미쿠의 하루</FlipCard.Title>
          <FlipCard.Description>오늘도 열심히 노래 연습을 하고 있어요! 미쿠리가 정말 예쁘죠? 💙</FlipCard.Description>
        </div>
      </FlipCard.Content>
    </FlipCard>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-8">
      <FlipCard.Grid>
        {Array.from({ length: 6 }, (_, i) => (
          <FlipCard key={i}>
            <FlipCard.Image src="./images/miku-main.png" alt="Miku" />
            <FlipCard.Content className="bg-slate-800">
              <div className="bg-gradient-to-br from-pink-500 to-yellow-400 p-5 rounded-lg">
                <FlipCard.Title>🎵 미쿠 카드 {i + 1}</FlipCard.Title>
                <FlipCard.Description>각각 다른 매력을 가진 미쿠의 모습들! 하나씩 마우스를 올려보세요 🌟</FlipCard.Description>
              </div>
            </FlipCard.Content>
          </FlipCard>
        ))}
      </FlipCard.Grid>
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <FlipCard>
      <FlipCard.Image src="./images/miku-main.png" alt="Miku" />
      <FlipCard.Content className="bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="p-5">
          <FlipCard.Title className="text-2xl font-bold mb-4">🎨 나만의 스타일</FlipCard.Title>
          <FlipCard.Description className="text-lg">원하는 색깔과 스타일로 자유롭게 꾸며보세요! 상상력이 곧 디자인이에요 🚀</FlipCard.Description>
        </div>
      </FlipCard.Content>
    </FlipCard>
  ),
};

export const ObjectFitVariations: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap justify-center">
      <FlipCard>
        <FlipCard.Image src="./images/miku-main.png" alt="Miku" objectFit="cover" />
        <FlipCard.Content className="bg-slate-800">
          <div className="bg-gradient-to-br from-green-500 to-blue-500 p-5 rounded-lg">
            <FlipCard.Title>📷 꽉 채우기 (Cover)</FlipCard.Title>
            <FlipCard.Description>이미지가 카드를 가득 채워서 시원해 보여요! 📐</FlipCard.Description>
          </div>
        </FlipCard.Content>
      </FlipCard>

      <FlipCard>
        <FlipCard.Image src="./images/miku-main.png" alt="Miku" objectFit="contain" />
        <FlipCard.Content className="bg-slate-800">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-5 rounded-lg">
            <FlipCard.Title>🖼️ 전체 보기 (Contain)</FlipCard.Title>
            <FlipCard.Description>이미지 전체가 잘리지 않고 다 보여요! 완벽주의자용 💫</FlipCard.Description>
          </div>
        </FlipCard.Content>
      </FlipCard>
    </div>
  ),
};
