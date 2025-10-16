import React from "react";

export default function Content() {
  return (
    <div className="tabs tabs-border mx-3">
      <input type="radio" name="my_tabs_2" className="tab" aria-label="Home" defaultChecked />
      <div className="tab-content border-base-300 bg-base-100 p-10">
        Tab content 1
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        className="tab"
        aria-label="Post"
     
      />
      <div className="tab-content border-base-300 bg-base-100 p-10">
        Tab content 2
      </div>

      <input type="radio" name="my_tabs_2" className="tab" aria-label="Shop" />
      <div className="tab-content border-base-300 bg-base-100 p-10">
        Tab content 3
      </div>

    </div>
  );
}


