"use client";

import { useRef } from "react";
import { ArrowLeft, Radio } from "lucide-react";

export function SessionHomeGuard() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const stayRef = useRef<HTMLButtonElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
    stayRef.current?.focus();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="brand brand-trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={openDialog}
      >
        mdr-ama<span>™</span>
      </button>

      <dialog
        ref={dialogRef}
        className="session-dialog"
        aria-labelledby="session-dialog-title"
        aria-describedby="session-dialog-description"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeDialog();
          }
        }}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="session-dialog-body">
          <div className="session-dialog-signal" aria-hidden="true">
            <Radio size={22} strokeWidth={2.4} />
          </div>
          <p className="eyebrow">Payment in progress</p>
          <h2 id="session-dialog-title">Leave this payment session?</h2>
          <p id="session-dialog-description" className="session-dialog-copy">
            Your progress is saved on this device. Leaving takes you home, and you can return with the original session link until it expires.
          </p>
          <div className="session-dialog-actions">
            <button ref={stayRef} className="button" type="button" onClick={closeDialog}>
              Stay in session
            </button>
            {/* A full-document link remains reliable while the native modal owns the top layer. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="secondary" href="/">
              <ArrowLeft size={17} />
              Leave session
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
