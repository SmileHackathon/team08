import classNames from "classnames";
import React, {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import styles from "./styles.module.css";

export default function SearchPanel(props: {
  children?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}) {
  /*const [input, setInput] = useState<string>("");*/
  const [supressSuggest, setSupressSuggest] = useState<boolean>(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      //setInput(ev.target.value);
      setSupressSuggest(false);

      props.onChange && props.onChange(ev.target.value ?? "");
    },
    [props]
  );

  const onChildrenChange = () => {
    setSupressSuggest(false);
  };

  const onSupressButtonClicked = useCallback(() => {
    setSupressSuggest(true);
  }, []);

  const onValueChange = () => {
    /*props.value && setInput(props.value);*/
    setSupressSuggest(false);
  };

  useEffect(onChildrenChange, [props.children]);
  useEffect(onValueChange, [props.value]);

  const openSuggest = props.children && !supressSuggest;

  return (
    <div
      className={classNames(styles.searchPanel, {
        [styles.hasChildren]: openSuggest,
      })}
    >
      <input
        type="text"
        className={styles.searchPanelInput}
        onChange={onChange}
        value={props.value}
      />
      {openSuggest ? (
        <div className={styles.suggest}>
          {props.children}
          <button onClick={onSupressButtonClicked}>閉じる</button>
        </div>
      ) : null}
    </div>
  );
}
