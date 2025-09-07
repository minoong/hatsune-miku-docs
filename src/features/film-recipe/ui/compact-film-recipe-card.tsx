import type { FilmRecipe } from '~/entities/film-recipe/model/types';

interface CompactFilmRecipeCardProps {
  recipe: FilmRecipe;
  isSelected?: boolean;
  onClick: () => void;
}

export const CompactFilmRecipeCard = ({ recipe, isSelected = false, onClick }: CompactFilmRecipeCardProps) => {
  return (
    <div className="flex-shrink-0 w-20 mr-3 last:mr-0">
      <div
        onClick={onClick}
        className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ${
          isSelected ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
        }`}
      >
        {/* 컬러 미리보기 */}
        <div
          className="h-16 relative flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${recipe.preview}60, ${recipe.preview})`,
          }}
        >
          {/* 선택 표시 */}
          {isSelected && (
            <div className="absolute top-1 right-1">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-2.5 h-2.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* 브랜드 아이콘 */}
          <div className="text-center">
            <div className="text-white/90 text-xs font-bold mb-1">{recipe.brand === 'fuji' ? 'F' : 'K'}</div>
          </div>
        </div>

        {/* 이름 */}
        <div className="bg-white px-2 py-2">
          <h3 className="text-xs font-medium text-gray-900 text-center leading-tight">{recipe.name}</h3>
        </div>
      </div>
    </div>
  );
};
