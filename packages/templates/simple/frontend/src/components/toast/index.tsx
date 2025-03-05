import { Toaster } from 'sonner'
import styled from 'styled-components'
import { Iconify } from '../icon'

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function Toast() {
  return (
    <ToasterStyleWrapper>
      <Toaster
        position="top-right"
        theme={'light'}
        toastOptions={{
          duration: 3000,
          classNames: {
            toast: 'rounded-lg border-0',
            description: 'text-xs text-current/45',
            content: 'flex-1 ml-2',
            icon: 'flex items-center justify-center px-4 rounded-lg',
            success: 'bg-success/10',
            error: 'bg-error/10',
            warning: 'bg-warning/10',
            info: 'bg-info/10',
          },
        }}
        icons={{
          success: (
            <div className="p-2 bg-success/10 rounded-lg">
              <Iconify icon="carbon:checkmark-filled" size={24} color="green" />
            </div>
          ),
          error: (
            <div className="p-2 bg-error/10 rounded-lg">
              <Iconify icon="carbon:warning-hex-filled" size={24} color="red" />
            </div>
          ),
          warning: (
            <div className="p-2 bg-warning/10 rounded-lg">
              <Iconify icon="carbon:warning-alt-filled" size={24} color="yellow" />
            </div>
          ),
          info: (
            <div className="p-2 bg-info/10 rounded-lg">
              <Iconify icon="carbon:information-filled" size={24} color="gray" />
            </div>
          ),
          loading: (
            <div className="p-2 bg-gray-400/10 text-gray-400 rounded-lg">
              <Iconify icon="svg-spinners:6-dots-scale-middle" size={24} speed={3} />
            </div>
          ),
        }}
        expand
      />
    </ToasterStyleWrapper>
  )
}

const ToasterStyleWrapper = styled.div`
  [data-sonner-toast] {
    font-weight: 600;
    font-size: 14px;

    [data-cancel] {
      background-color: transparent;
    }

    /* Default */
    [data-action] {
      background-color: transparent;
    }

    /* Info */
    &[data-type='info'] [data-action] {
      background-color: transparent;
    }

    /* Error */
    &[data-type='error'] [data-action] {
      background-color: transparent;
    }

    /* Success */
    &[data-type='success'] [data-action] {
      background-color: transparent;
    }

    /* Warning */
    &[data-type='warning'] [data-action] {
      background-color: transparent;
    }

    /* Close Button */
    [data-close-button] {
      top: 0;
      right: 0;
      left: auto;
      border-width: 1px;
      border-style: dashed;
    }
  }
`
