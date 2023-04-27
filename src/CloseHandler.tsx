
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useCloseHandler(ref:any, active:boolean, onClose:any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event:any) {
		if (!active) {
			//return;
		}
      if (ref.current && !ref.current.contains(event.target)) {
        //alert("You clicked outside of me!");
		      onClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, active, onClose]);
}

export interface CloseHandlerProps {
	active: boolean;
	children: any;
	onClose: () => void;

  }

/**
 * Component that alerts if you click outside of it
 */
export default function CloseHandler(props:CloseHandlerProps) {
  const wrapperRef = useRef(null);
  useCloseHandler(wrapperRef, props.active, props.onClose);
  const active = props.active;

	return <div ref={wrapperRef}>{props.children}</div>;


  
}

CloseHandler.propTypes = {
  children: PropTypes.element.isRequired
};
