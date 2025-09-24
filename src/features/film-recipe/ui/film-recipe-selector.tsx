import { useState } from 'react';

import { FILM_RECIPES, type FilmRecipe } from '~/entities/film-recipe/model/types';
import { Button } from '~/shared/ui/button/button';
import type { Any } from '~/shared/model/global';

import { FilmRecipeCard } from './film-recipe-card';

interface FilmRecipeSelectorProps {
  selectedRecipe?: FilmRecipe | null;
  onRecipeSelect: (recipe: FilmRecipe | null) => void;
  onClose: () => void;
}

export const FilmRecipeSelector = ({ selectedRecipe, onRecipeSelect, onClose }: FilmRecipeSelectorProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fuji' | 'kodak'>('all');

  const filteredRecipes = FILM_RECIPES.filter((recipe) => {
    if (activeTab === 'all') return true;
    return recipe.brand === activeTab;
  });

  const handleRecipeSelect = (recipe: FilmRecipe) => {
    onRecipeSelect(recipe);
  };

  const handleClearSelection = () => {
    onRecipeSelect(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onClose} className="p-2">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h1 className="text-xl font-bold text-gray-900">필름 레시피</h1>
        </div>

        {selectedRecipe && (
          <Button variant="ghost" onClick={handleClearSelection} className="text-sm">
            초기화
          </Button>
        )}
      </div>

      {/* 탭 */}
      <div className="border-b border-gray-200 bg-white px-4">
        <div className="flex space-x-8">
          {[
            { key: 'all', label: '전체' },
            { key: 'fuji', label: 'FUJI' },
            { key: 'kodak', label: 'KODAK' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Any)}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 레시피 목록 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4 pb-6">
          {/* 기본 (레시피 없음) 옵션 */}
          <div
            onClick={() => onRecipeSelect(null)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
              !selectedRecipe ? 'scale-105 shadow-lg ring-2 ring-blue-500' : 'shadow-md hover:scale-102 hover:shadow-lg'
            }`}
          >
            <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
              <div className="text-center">
                <svg className="mx-auto mb-2 h-8 w-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <span className="text-sm font-medium text-white/90">원본</span>
              </div>

              {!selectedRecipe && (
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
            </div>
            <div className="bg-white p-4">
              <h3 className="mb-1 text-lg font-semibold text-gray-900">필터 없음</h3>
              <p className="text-sm text-gray-600">원본 사진 그대로</p>
            </div>
          </div>

          {/* 필름 레시피들 */}
          {filteredRecipes.map((recipe) => (
            <FilmRecipeCard key={recipe.id} recipe={recipe} isSelected={selectedRecipe?.id === recipe.id} onClick={() => handleRecipeSelect(recipe)} />
          ))}
        </div>
      </div>
    </div>
  );
};
