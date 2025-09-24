import { Modal, Box, Typography, IconButton, Divider, Chip, Button } from '@mui/material';
import { Close as CloseIcon, LocationOn, Settings, Info, Keyboard, PhotoCamera, AccessTime, CameraEnhance } from '@mui/icons-material';

import { getCameraSettings, getDeviceInfo, formatDateTime, formatGPSCoordinates, hasGPSData } from '~/shared/lib/exif-utils';

import type { ExifInfoProps } from '../model/types';

export const ExifInfo = ({ media, isOpen, onClose }: ExifInfoProps) => {
  if (!media.exifData || media.type !== 'image') {
    return null;
  }

  const cameraSettings = getCameraSettings(media.exifData);
  const deviceInfo = getDeviceInfo(media.exifData);
  const gpsCoordinates = formatGPSCoordinates(media.exifData);

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    maxWidth: '90vw',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 2,
    boxShadow: 24,
    outline: 'none',
    overflow: 'auto',
    background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="exif-modal-title"
      aria-describedby="exif-modal-description"
      closeAfterTransition
      sx={{
        backdropFilter: 'blur(4px)',
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <Box sx={modalStyle}>
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.light',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Info sx={{ fontSize: 16, color: 'primary.main' }} />
              </Box>
              <Typography id="exif-modal-title" variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                EXIF 데이터
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* File Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Info sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                파일 정보
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  이름
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }} title={media.name}>
                  {media.name}
                </Typography>
              </Box>
              {media.metadata && (
                <>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      해상도
                    </Typography>
                    <Chip
                      label={`${media.metadata.width}×${media.metadata.height}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      종횡비
                    </Typography>
                    <Typography variant="body2">{media.metadata.aspectRatio.toFixed(2)}:1</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      방향
                    </Typography>
                    <Chip label={media.metadata.orientation} size="small" color="primary" />
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* Camera Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhotoCamera sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                카메라 정보
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  기기
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }} title={deviceInfo}>
                  {deviceInfo}
                </Typography>
              </Box>
              {media.exifData.software && (
                <>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      소프트웨어
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }} title={media.exifData.software}>
                      {media.exifData.software}
                    </Typography>
                  </Box>
                </>
              )}
              {media.exifData.datetime && (
                <>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      촬영 날짜
                    </Typography>
                    <Chip
                      label={formatDateTime(media.exifData.datetime)}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* Camera Settings */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Settings sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                카메라 설정
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'primary.light' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <AccessTime sx={{ fontSize: 12, mr: 0.5, color: 'primary.main' }} />
                  <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                    노출시간
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {cameraSettings.exposureTime}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'primary.light' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <CameraEnhance sx={{ fontSize: 12, mr: 0.5, color: 'primary.main' }} />
                  <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                    조리개
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {cameraSettings.fNumber}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'primary.light' }}>
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500, mb: 0.5, display: 'block' }}>
                  ISO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {cameraSettings.iso}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'primary.light' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <LocationOn sx={{ fontSize: 12, mr: 0.5, color: 'primary.main' }} />
                  <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                    초점거리
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {cameraSettings.focalLength}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* GPS Location */}
          {hasGPSData(media.exifData) && (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'success.light', borderRadius: 2, border: '1px solid', borderColor: 'success.main' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                  위치 정보
                </Typography>
              </Box>
              <Box sx={{ mb: 2, p: 1.5, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'success.light' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="success.main" sx={{ fontWeight: 500 }}>
                    좌표
                  </Typography>
                  <Chip label={gpsCoordinates} size="small" variant="outlined" sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }} />
                </Box>
                {media.exifData.gpsAltitude && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 500 }}>
                      고도
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {media.exifData.gpsAltitude}m
                    </Typography>
                  </Box>
                )}
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="success"
                size="small"
                startIcon={<LocationOn />}
                onClick={() => {
                  if (gpsCoordinates) {
                    const [lat, lng] = gpsCoordinates.split(', ');
                    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
                  }
                }}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                지도에서 보기
              </Button>
            </Box>
          )}

          {/* Technical Details */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.300' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Settings sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                기술 세부사항
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {media.exifData.orientation && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    방향
                  </Typography>
                  <Chip label={media.exifData.orientation} size="small" variant="outlined" />
                </Box>
              )}
              {media.exifData.xResolution && media.exifData.yResolution && (
                <>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      해상도
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {media.exifData.xResolution}×{media.exifData.yResolution} DPI
                    </Typography>
                  </Box>
                </>
              )}
              {media.exifData.flash !== undefined && (
                <>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      플래시
                    </Typography>
                    <Chip label={media.exifData.flash ? '사용' : '미사용'} size="small" color={media.exifData.flash ? 'warning' : 'default'} />
                  </Box>
                </>
              )}
              {media.exifData.whiteBalance !== undefined && (
                <>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      화이트 밸런스
                    </Typography>
                    <Chip
                      label={media.exifData.whiteBalance === 0 ? '자동' : '수동'}
                      size="small"
                      color={media.exifData.whiteBalance === 0 ? 'success' : 'primary'}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* Keyboard shortcuts */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'grey.300' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Keyboard sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                키보드 단축키
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  EXIF 패널 열기/닫기
                </Typography>
                <Chip label="I" size="small" variant="outlined" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', minWidth: 24 }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  패널 닫기
                </Typography>
                <Chip label="Esc" size="small" variant="outlined" sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
