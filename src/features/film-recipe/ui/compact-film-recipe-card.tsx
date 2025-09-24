import type { FilmRecipe } from '~/entities/film-recipe/model/types';

interface CompactFilmRecipeCardProps {
  recipe: FilmRecipe;
  isSelected?: boolean;
  onClick: () => void;
}

export const CompactFilmRecipeCard = ({ recipe, isSelected = false, onClick }: CompactFilmRecipeCardProps) => {
  return (
    <div className="mr-3 w-20 flex-shrink-0 last:mr-0">
      <div
        onClick={onClick}
        className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-200 ${
          isSelected ? 'scale-105 ring-2 ring-blue-500' : 'hover:scale-105'
        }`}
      >
        {/* 컬러 미리보기 */}
        <div
          className="relative flex h-16 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${recipe.preview}60, ${recipe.preview})`,
          }}
        >
          {/* 선택 표시 */}
          {isSelected && (
            <div className="absolute top-1 right-1">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                <svg className="h-2.5 w-2.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="mb-1 text-xs font-bold text-white/90">{recipe.brand === 'fuji' ? 'F' : 'K'}</div>
          </div>
        </div>

        {/* 이름 */}
        <div className="bg-white px-2 py-2">
          <h3 className="text-center text-xs leading-tight font-medium text-gray-900">{recipe.name}</h3>
        </div>
      </div>
    </div>
  );
};
