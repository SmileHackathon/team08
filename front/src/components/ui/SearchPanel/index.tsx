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
  const [supressSuggest, setSupressSuggest] = useState<boolean>(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      setSupressSuggest(false);

      props.onChange && props.onChange(ev.target.value ?? "");
    },
    [props]
  );

  const onSupressButtonClicked = useCallback(() => {
    setSupressSuggest(true);
  }, []);

  const onValueChange = () => {
    setSupressSuggest(false);
  };

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
