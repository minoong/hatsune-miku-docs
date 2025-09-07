import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FILM_RECIPES, type FilmRecipe } from '~/entities/film-recipe/model/types';
import { CompactFilmRecipeCard } from './compact-film-recipe-card';
import { Button } from '~/shared/ui/button/button';

interface CompactFilmRecipeBottomSheetProps {
  isOpen: boolean;
  selectedRecipe?: FilmRecipe | null;
  onRecipeSelect: (recipe: FilmRecipe | null) => void;
  onClose: () => void;
}

type CategoryType = 'all' | 'fuji' | 'kodak';

interface Category {
  key: CategoryType;
  label: string;
  color: string;
  activeColor: string;
}

const CATEGORIES: Category[] = [
  {
    key: 'all',
    label: '전체',
    color: 'bg-gray-100 text-gray-600',
    activeColor: 'bg-blue-100 text-blue-700',
  },
  {
    key: 'fuji',
    label: 'FUJI',
    color: 'bg-gray-100 text-gray-600',
    activeColor: 'bg-green-100 text-green-700',
  },
  {
    key: 'kodak',
    label: 'KODAK',
    color: 'bg-gray-100 text-gray-600',
    activeColor: 'bg-yellow-100 text-yellow-700',
  },
];

export const CompactFilmRecipeBottomSheet = ({ isOpen, selectedRecipe, onRecipeSelect, onClose }: CompactFilmRecipeBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('all');
  const [visibleBrand, setVisibleBrand] = useState<CategoryType>('all');
  const recipeScrollRef = useRef<HTMLDivElement>(null);

  // 모든 레시피 (원본 + 필터)
  const allRecipes = [
    { type: 'original' as const, recipe: null },
    ...FILM_RECIPES.filter((recipe) => recipe.brand === 'fuji').map((recipe) => ({ type: 'recipe' as const, recipe })),
    ...FILM_RECIPES.filter((recipe) => recipe.brand === 'kodak').map((recipe) => ({ type: 'recipe' as const, recipe })),
  ];

  // 뷰포트 기반 브랜드 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!recipeScrollRef.current || activeTab !== 'all') return;

      const scrollElement = recipeScrollRef.current;
      const scrollLeft = scrollElement.scrollLeft;
      const itemWidth = 92; // 카드 너비 (80px) + 마진 (12px)
      const fujiStartIndex = 1; // 원본(0) 다음부터 후지
      const fujiItemCount = FILM_RECIPES.filter((r) => r.brand === 'fuji').length;
      const kodakStartIndex = fujiStartIndex + fujiItemCount;

      const visibleIndex = Math.round(scrollLeft / itemWidth);

      if (visibleIndex < fujiStartIndex) {
        setVisibleBrand('all'); // 원본 영역
      } else if (visibleIndex < kodakStartIndex) {
        setVisibleBrand('fuji'); // 후지 영역
      } else {
        setVisibleBrand('kodak'); // 코닥 영역
      }
    };

    if (recipeScrollRef.current && activeTab === 'all') {
      const scrollElement = recipeScrollRef.current;
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 상태 설정

      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [activeTab, isOpen]);

  const handleRecipeSelect = (recipe: FilmRecipe | null) => {
    onRecipeSelect(recipe);
    onClose();
  };

  const handleTabClick = (tabKey: CategoryType) => {
    setActiveTab(tabKey);
    if (tabKey !== 'all' && recipeScrollRef.current) {
      recipeScrollRef.current.scrollLeft = 0;
    }
  };

  const getCategoryStyle = (category: Category) => {
    if (activeTab === category.key) {
      return category.activeColor + ' font-medium';
    }

    // 전체 탭에서 뷰포트에 보이는 브랜드 하이라이트
    if (activeTab === 'all' && visibleBrand === category.key && category.key !== 'all') {
      return category.activeColor + ' font-medium';
    }

    return category.color + ' hover:bg-gray-200';
  };

  // 현재 탭에 따른 레시피 필터링
  const getFilteredRecipes = () => {
    if (activeTab === 'all') {
      return allRecipes;
    }

    return [
      { type: 'original' as const, recipe: null },
      ...FILM_RECIPES.filter((recipe) => recipe.brand === activeTab).map((recipe) => ({ type: 'recipe' as const, recipe })),
    ];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 shadow-2xl"
            style={{ maxHeight: '35vh' }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 1 }}
            onDragEnd={(_, info) => {
              if (info.velocity.y > 500 || info.offset.y > 100) {
                onClose();
              }
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
              <div className="w-8 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="flex flex-col h-full pb-6">
              {/* 헤더 - 컴팩트하게 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between px-4 py-2 border-b border-gray-200 cursor-grab active:cursor-grabbing"
              >
                <h2 className="text-lg font-semibold text-gray-900">필름 레시피</h2>
                {selectedRecipe && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Button variant="ghost" onClick={() => handleRecipeSelect(null)} className="text-sm px-2 py-1">
                      초기화
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* 카테고리 탭 - 컴팩트하게 */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="px-4 py-2 border-b border-gray-100"
              >
                <div className="flex space-x-2">
                  {CATEGORIES.map((category, index) => (
                    <motion.button
                      key={category.key}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTabClick(category.key)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${getCategoryStyle(category)}`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* 레시피 스크롤 - 메인 영역 */}
              <div className="flex-1 overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="px-4 py-3">
                  <div ref={recipeScrollRef} className="flex overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {getFilteredRecipes().map((item, index) => {
                      if (item.type === 'original') {
                        return (
                          <motion.div
                            key="original"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="flex-shrink-0 w-20 mr-3"
                          >
                            <motion.div
                              whileTap={{ scale: 0.95 }}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => handleRecipeSelect(null)}
                              className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ${
                                !selectedRecipe ? 'ring-2 ring-blue-500 scale-105' : ''
                              }`}
                            >
                              <div className="h-16 bg-gradient-to-br from-gray-200 to-gray-400 relative flex items-center justify-center">
                                <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>

                                <AnimatePresence>
                                  {!selectedRecipe && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0 }}
                                      className="absolute top-1 right-1"
                                    >
                                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <svg className="w-2.5 h-2.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              <div className="bg-white px-2 py-2">
                                <h3 className="text-xs font-medium text-gray-900 text-center leading-tight">원본</h3>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={item.recipe!.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <CompactFilmRecipeCard
                            recipe={item.recipe!}
                            isSelected={selectedRecipe?.id === item.recipe!.id}
                            onClick={() => handleRecipeSelect(item.recipe!)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
