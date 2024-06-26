import { useState } from "react";
import { contracts } from "../../utils/contractDictionary";
import { dictionary } from "../../utils/dictionary";
import styles from "./ContractTabs.module.css";

const ContractTabs = ({ isVisible }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { contractTabs } = dictionary.components;
  return (
    <>
      {isVisible && (
        <>
          <div className={styles.containerTab}>
            {contracts?.map(({ contractName }, index) => (
              <span
                className={`${styles.levelTab} ${
                  parseInt(index) === parseInt(activeTab) && styles.activeTab
                }`}
                onClick={() => setActiveTab(parseInt(index))}
              >
                {contractName}
              </span>
            ))}
          </div>
          <div className={styles.contractContentContainer}>
            <span>
              {contracts[activeTab].contractContent}
              <a href={contracts[activeTab].link} target="_blank">{contractTabs.viewMore}</a>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default ContractTabs;
