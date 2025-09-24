import type { FilmRecipe } from '~/entities/film-recipe/model/types';

interface FilmRecipeCardHorizontalProps {
  recipe: FilmRecipe;
  isSelected?: boolean;
  onClick: () => void;
}

export const FilmRecipeCardHorizontal = ({ recipe, isSelected = false, onClick }: FilmRecipeCardHorizontalProps) => {
  const brandColors = {
    fuji: 'from-green-400 to-green-600',
    kodak: 'from-yellow-400 to-orange-500',
  };

  const brandLabels = {
    fuji: 'FUJI',
    kodak: 'KODAK',
  };

  return (
    <div className="mr-4 w-32 flex-shrink-0 last:mr-0">
      <div
        onClick={onClick}
        className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
          isSelected ? 'scale-105 shadow-lg ring-2 ring-blue-500' : 'shadow-md hover:scale-105 hover:shadow-lg'
        }`}
      >
        {/* 배경 그라데이션 */}
        <div
          className={`h-24 bg-gradient-to-br ${brandColors[recipe.brand]} relative`}
          style={{
            background: `linear-gradient(135deg, ${recipe.preview}40, ${recipe.preview}80)`,
          }}
        >
          {/* 브랜드 로고 */}
          <div className="absolute top-2 left-2">
            <span className="rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-bold text-white/90">{brandLabels[recipe.brand]}</span>
          </div>

          {/* 선택 표시 */}
          {isSelected && (
            <div className="absolute top-2 right-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
          <div className="absolute bottom-2 left-2 flex space-x-0.5">
            <div className="h-2 w-2 rounded-full border border-white/50" style={{ backgroundColor: recipe.preview }} />
            <div className="h-1.5 w-1.5 rounded-full border border-white/30" style={{ backgroundColor: `${recipe.preview}80` }} />
            <div className="h-1.5 w-1.5 rounded-full border border-white/30" style={{ backgroundColor: `${recipe.preview}60` }} />
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="bg-white p-3">
          <h3 className="mb-1 text-sm leading-tight font-semibold text-gray-900">{recipe.name}</h3>
          <p className="line-clamp-2 text-xs text-gray-600">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};
