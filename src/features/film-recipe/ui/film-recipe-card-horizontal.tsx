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
    <div className="flex-shrink-0 w-32 mr-4 last:mr-0">
      <div
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
          isSelected ? 'ring-2 ring-blue-500 scale-105 shadow-lg' : 'hover:scale-105 shadow-md hover:shadow-lg'
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
            <span className="text-[10px] font-bold text-white/90 bg-black/20 px-1.5 py-0.5 rounded">{brandLabels[recipe.brand]}</span>
          </div>

          {/* 선택 표시 */}
          {isSelected && (
            <div className="absolute top-2 right-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="w-2 h-2 rounded-full border border-white/50" style={{ backgroundColor: recipe.preview }} />
            <div className="w-1.5 h-1.5 rounded-full border border-white/30" style={{ backgroundColor: `${recipe.preview}80` }} />
            <div className="w-1.5 h-1.5 rounded-full border border-white/30" style={{ backgroundColor: `${recipe.preview}60` }} />
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="bg-white p-3">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{recipe.name}</h3>
          <p className="text-xs text-gray-600 line-clamp-2">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};
