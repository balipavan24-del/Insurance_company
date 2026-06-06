import { useCallback, useEffect, useState } from 'react';
import './AnimatedModal.css';

export const MODAL_EXIT_MS = 320;

export function useAnimatedModal(isOpen) {
  const [visible, setVisible] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setClosing(false);
      return undefined;
    }

    if (visible) {
      setClosing(true);
      const timer = window.setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, MODAL_EXIT_MS);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [isOpen, visible]);

  return { visible, closing };
}

export function modalOverlayClass(closing, base = '') {
  const motion = closing ? 'insureease-modal-overlay--out' : 'insureease-modal-overlay--in';
  return base ? `${base} ${motion}` : motion;
}

export function modalPanelClass(closing, base = '', { sheet = false } = {}) {
  const motion = closing ? 'insureease-modal-panel--out' : 'insureease-modal-panel--in';
  const sheetClass = sheet ? 'insureease-modal-panel insureease-modal-panel--sheet' : 'insureease-modal-panel';
  return base ? `${base} ${sheetClass} ${motion}` : `${sheetClass} ${motion}`;
}

function AnimatedModal({
  isOpen,
  onClose,
  children,
  overlayClassName = '',
  panelClassName = '',
  panelTag: PanelTag = 'section',
  role = 'dialog',
  ariaModal = true,
  ariaLabelledby,
  ariaLabel,
  closeOnOverlayClick = true,
  lockScroll = true,
  panelSheet = false,
}) {
  const { visible, closing } = useAnimatedModal(isOpen);

  const requestClose = useCallback(() => {
    if (!closing) {
      onClose?.();
    }
  }, [closing, onClose]);

  useEffect(() => {
    if (!visible || !lockScroll) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        requestClose();
      }
    };

    window.addEventListener('keydown', handleEscClose);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [visible, lockScroll, requestClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={modalOverlayClass(closing, overlayClassName)}
      role={role}
      aria-modal={ariaModal}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      onClick={closeOnOverlayClick ? requestClose : undefined}
    >
      <PanelTag
        className={modalPanelClass(closing, panelClassName, { sheet: panelSheet })}
        onClick={(event) => event.stopPropagation()}
      >
        {typeof children === 'function' ? children({ requestClose, closing }) : children}
      </PanelTag>
    </div>
  );
}

export default AnimatedModal;
