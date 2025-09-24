import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import type { Any } from '~/shared/model/global';

import type { DropzoneProps } from '../model/types';

interface FileDropzoneProps extends DropzoneProps {
  isDragActive?: boolean;
  isDragAccept?: boolean;
  isDragReject?: boolean;
  children?: ReactNode;
  [key: string]: Any; // Allow all dropzone props
}

export const FileDropzone = ({
  isDragActive = false,
  isDragAccept = false,
  isDragReject = false,
  disabled = false,
  children,
  className = '',
  ...dropzoneProps
}: FileDropzoneProps) => {
  const getDropzoneState = () => {
    if (disabled) return 'disabled';
    if (isDragReject) return 'reject';
    if (isDragAccept) return 'accept';
    if (isDragActive) return 'active';
    return 'idle';
  };

  const state = getDropzoneState();

  const stateStyles = {
    idle: 'border-gray-300 bg-gray-50 text-gray-600',
    active: 'border-blue-400 bg-blue-50 text-blue-600',
    accept: 'border-green-400 bg-green-50 text-green-600',
    reject: 'border-red-400 bg-red-50 text-red-600',
    disabled: 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    active: { scale: 1, rotate: 5 },
    accept: { scale: 1, rotate: 0 },
    reject: { scale: 0.9, rotate: -5 },
  };

  const { getRootProps, getInputProps } = dropzoneProps;

  return (
    <motion.div
      className={`relative mx-auto h-72 w-48 overflow-hidden rounded-xs border-2 border-dashed bg-contain bg-center bg-no-repeat p-4 text-center transition-all duration-200 ${stateStyles[state]} ${!disabled ? 'cursor-pointer hover:border-blue-400' : ''} ${className} `}
      style={{
        backgroundImage: `url('/images/miku-main.png')`,
      }}
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      {...(getRootProps ? getRootProps() : {})}
    >
      {/* Hidden file input */}
      {getInputProps && <input {...getInputProps()} />}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-end space-y-2"
        variants={iconVariants}
        animate={state}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children || (
          <>
            <motion.div className="text-2xl" initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20 }} transition={{ delay: 0.1 }}>
              {state === 'reject' && '❌'}
            </motion.div>

            <div className="space-y-1 rounded bg-white p-2">
              <motion.p className="text-xs font-medium text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                {state === 'active' && '파일을 여기에 놓으세요.'}
                {state === 'accept' && '✅ 업로드 준비 완료.'}
                {state === 'reject' && '잘못된 파일입니다.'}
                {state === 'idle' && '파일을 드래그하거나 클릭하세요.'}
                {state === 'disabled' && '업로드 비활성화.'}
              </motion.p>

              {state === 'idle' && (
                <motion.p className="text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  이미지 및 동영상 지원
                </motion.p>
              )}

              {state === 'reject' && (
                <motion.p className="text-xs text-red-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  파일 형식과 크기를 확인해주세요
                </motion.p>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Animated border effect */}
      {state === 'active' && (
        <motion.div
          className="absolute inset-0 rounded-xs border-2 border-blue-400"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};
