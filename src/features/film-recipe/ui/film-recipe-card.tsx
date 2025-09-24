import type { FilmRecipe } from '~/entities/film-recipe/model/types';

interface FilmRecipeCardProps {
  recipe: FilmRecipe;
  isSelected?: boolean;
  onClick: () => void;
}

export const FilmRecipeCard = ({ recipe, isSelected = false, onClick }: FilmRecipeCardProps) => {
  const brandColors = {
    fuji: 'from-green-400 to-green-600',
    kodak: 'from-yellow-400 to-orange-500',
  };

  const brandLabels = {
    fuji: 'FUJI',
    kodak: 'KODAK',
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
        isSelected ? 'scale-105 shadow-lg ring-2 ring-blue-500' : 'shadow-md hover:scale-102 hover:shadow-lg'
      }`}
    >
      {/* 배경 그라데이션 */}
      <div
        className={`h-32 bg-gradient-to-br ${brandColors[recipe.brand]} relative`}
        style={{
          background: `linear-gradient(135deg, ${recipe.preview}40, ${recipe.preview}80)`,
        }}
      >
        {/* 브랜드 로고 */}
        <div className="absolute top-3 left-3">
          <span className="rounded bg-black/20 px-2 py-1 text-xs font-bold text-white/90">{brandLabels[recipe.brand]}</span>
        </div>

        {/* 선택 표시 */}
        {isSelected && (
          <div className="absolute top-3 right-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}

        {/* 프리뷰 색상 점들 */}
        <div className="absolute bottom-3 left-3 flex space-x-1">
          <div className="h-3 w-3 rounded-full border border-white/50" style={{ backgroundColor: recipe.preview }} />
          <div className="h-2 w-2 rounded-full border border-white/30" style={{ backgroundColor: `${recipe.preview}80` }} />
          <div className="h-2 w-2 rounded-full border border-white/30" style={{ backgroundColor: `${recipe.preview}60` }} />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="bg-white p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <p className="text-sm text-gray-600">{recipe.description}</p>
      </div>
    </div>
  );
};
