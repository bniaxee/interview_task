import React, { useState, useEffect } from "react";
import Accordion from "./accordion";

import { AXIOS_INSTANCE_WITHOUT_HEADERS as instanceApi } from "./Services/api";
const SectionAccordion = () => {
  const [Sections, setSections] = useState([]);
  var iteration = 0;

  //Calling API on load
  useEffect(() => {
    getSections();
  }, [0]);

  const getSections = async () => {
    //Fetching data from API and Traversing array and coverting into workable json.
    const response = await instanceApi.get("sections.json");
    for (const item of response.data) {
      const parent = response.data.find(({ id }) => id === item.parentId);
      if (parent) {
        parent.children = parent.children ? [...parent.children, item] : [item];
      }
    }
    setSections(response.data.filter(({ parent_id }) => !parent_id));
  };

  //Filtering categories from sections
  function getCategory(e, id) {
    e.preventDefault();
    setChildren(Sections.filter((x) => x.parentId === id));
  }

  //Recursive Component Rendering
  return (
    <>
      {Sections.map(
        (x, index) =>
          index === 0 && (
            <div key={x.id} className="ac">
              <input
                className="ac-input"
                id={x.id}
                name={x.id}
                type="checkbox"
              />
              <label className="ac-label" htmlFor={x.id}>
                {x.title}
              </label>
              <Accordion
                msg={x.title}
                id={x.id}
                parentid={x.parentId}
                iteration={++iteration}
                child={x.children}
                setChildren={getCategory}
              />
            </div>
          )
      )}

      {/* <div className="ac-sub">
        <input className="ac-input" id="ac-2" name="ac-2" type="checkbox" />
        <label className="ac-label" htmlFor="ac-2">
          I love asddas donuts
        </label>
        <article className="ac-text">
          <p>
            But not only is the sea such a foe to man who is an alien to it, but
            it is also a fiend to its own off-spring; worse than the Persian
            host who murdered his own guests; sparing not the creatures which
            itself hath spawned. Like a savage tigress that tossing in the
            jungle overlays her own cubs, so the sea dashes even the mightiest
            whales against the rocks, and leaves them there side by side with
            the split wrecks of ships. No mercy, no power but its own controls
            it. Panting and snorting like a mad battle steed that has lost its
            rider, the masterless ocean overruns the globe.
          </p>
        </article>
      </div> */}

      {/* <section className="container">
        <h1>CSS Accordions</h1>
        <h3>Because we can.</h3>

        <div className="ac">
          <input className="ac-input" id="ac-1" name="ac-1" type="checkbox" />
          <label className="ac-label" htmlFor="ac-1">
            Item 1
          </label>
          <div className="ac-text">
            <div className="ac-sub">
              <input
                className="ac-input"
                id="ac-2"
                name="ac-2"
                type="checkbox"
              />
              <label className="ac-label" htmlFor="ac-2">
                I love jelly donuts
              </label>
              <article className="ac-sub-text">
                <p>
                  But not only is the sea such a foe to man who is an alien to
                  it, but it is also a fiend to its own off-spring; worse than
                  the Persian host who murdered his own guests; sparing not the
                  creatures which itself hath spawned. Like a savage tigress
                  that tossing in the jungle overlays her own cubs, so the sea
                  dashes even the mightiest whales against the rocks, and leaves
                  them there side by side with the split wrecks of ships. No
                  mercy, no power but its own controls it. Panting and snorting
                  like a mad battle steed that has lost its rider, the
                  masterless ocean overruns the globe.
                </p>
              </article>
            </div>

            <div className="ac-sub">
              <input
                className="ac-input"
                id="ac-3"
                name="ac-3"
                type="checkbox"
              />
              <label className="ac-label" htmlFor="ac-3">
                They are so delicious
              </label>
              <article className="ac-sub-text">
                <p>
                  My younger brother was in London when the Martians fell at
                  Woking. He was a medical student working htmlFor an imminent
                  examination, and he heard nothing of the arrival until
                  Saturday morning. The morning papers on Saturday contained, in
                  addition to lengthy special articles on the planet Mars, on
                  life in the planets, and so htmlForth, a brief and vaguely
                  worded telegram, all the more striking htmlFor its brevity.
                </p>

                <p>
                  The Martians, alarmed by the approach of a crowd, had killed a
                  number of people with a quick-firing gun, so the story ran.
                  The telegram concluded with the words: "htmlFormidable as they
                  seem to be, the Martians have not moved from the pit into
                  which they have fallen, and, indeed, seem incapable of doing
                  so. Probably this is due to the relative strength of the
                  earth's gravitational energy." On that last text their
                  leader-writer expanded very comhtmlFortingly.
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="ac">
          <input className="ac-input" id="ac-4" name="ac-4" type="checkbox" />
          <label className="ac-label" htmlFor="ac-4">
            Item 2
          </label>

          <article className="ac-text">
            <div className="ac-sub">
              <input
                className="ac-input"
                id="ac-5"
                name="ac-5"
                type="checkbox"
              />
              <label className="ac-label" htmlFor="ac-5">
                I also love regular donuts
              </label>
              <article className="ac-sub-text">
                <p>
                  But not only is the sea such a foe to man who is an alien to
                  it, but it is also a fiend to its own off-spring; worse than
                  the Persian host who murdered his own guests; sparing not the
                  creatures which itself hath spawned. Like a savage tigress
                  that tossing in the jungle overlays her own cubs, so the sea
                  dashes even the mightiest whales against the rocks, and leaves
                  them there side by side with the split wrecks of ships. No
                  mercy, no power but its own controls it. Panting and snorting
                  like a mad battle steed that has lost its rider, the
                  masterless ocean overruns the globe.
                </p>

                <p>
                  Consider the subtleness of the sea; how its most dreaded
                  creatures glide under water, unapparent htmlFor the most part,
                  and treacherously hidden beneath the loveliest tints of azure.
                  Consider also the devilish brilliance and beauty of many of
                  its most remorseless tribes, as the dainty embellished shape
                  of many species of sharks. Consider, once more, the universal
                  cannibalism of the sea; all whose creatures prey upon each
                  other, carrying on eternal war since the world began.
                </p>
              </article>
            </div>

            <div className="ac-sub">
              <input
                className="ac-input"
                id="ac-6"
                name="ac-6"
                type="checkbox"
              />
              <label className="ac-label" htmlFor="ac-6">
                They are also delicious
              </label>
              <article className="ac-sub-text">
                <p>
                  My younger brother was in London when the Martians fell at
                  Woking. He was a medical student working htmlFor an imminent
                  examination, and he heard nothing of the arrival until
                  Saturday morning. The morning papers on Saturday contained, in
                  addition to lengthy special articles on the planet Mars, on
                  life in the planets, and so htmlForth, a brief and vaguely
                  worded telegram, all the more striking htmlFor its brevity.
                </p>

                <p>
                  The Martians, alarmed by the approach of a crowd, had killed a
                  number of people with a quick-firing gun, so the story ran.
                  The telegram concluded with the words: "htmlFormidable as they
                  seem to be, the Martians have not moved from the pit into
                  which they have fallen, and, indeed, seem incapable of doing
                  so. Probably this is due to the relative strength of the
                  earth's gravitational energy." On that last text their
                  leader-writer expanded very comhtmlFortingly.
                </p>
              </article>
            </div>
          </article>
        </div>
      </section> */}
    </>
  );
};

export default SectionAccordion;
