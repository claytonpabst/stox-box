import React from 'react';

const Tab = ({ activeTab, setActiveTab, label }) => {
  return (
    <h2
      onClick={() => setActiveTab(label)}
      className={'tab ' + (activeTab === label ? 'tab-active' : 'tab-disabled')}
    >
      {label}
    </h2>
  );
};

export default Tab;
