import React from "react";
import { AXIOS_INSTANCE_WITHOUT_HEADERS as instanceApi } from "./Services/api";
const Accordion = ({
  msg,
  id,
  parentId,
  iteration = 0,
  child,
  setChildren,
}) => {
  //Getting Questions based on ID of section.
  const insertQuestions = async (event) => {
    event.persist();

    //Calling API to get company-dealings and Directors...
    var response = await instanceApi.get("company-dealings/qa.json");
    var response2 = await instanceApi.get(
      "directors-officers-management/qa.json"
    );

    //Combining both arrays
    response = response.data.concat(response2.data);

    //Filtering out questions based on section id
    var arr = response.filter((x) => x.sectionId == event.target.id);

    //Adding and removing questions inside relevant category on runtime.
    var element = document.getElementById(event.target.id).nextSibling;
    if (element.parentElement.querySelector(".article") != null) {
      while (element.parentElement.querySelector(".tempChild")) {
        element.parentElement.querySelector(".tempChild").remove();
      }
    } else {
      arr.forEach((item) => {
        var child = `<div class="ac-sub">
                        <input class="ac-input" id="qa_${item.qa_id}" name="qa_${item.qa_id}" type="checkbox" />
                        <label class="ac-label" for="qa_${item.qa_id}">
                        ${item.question}
                        </label>
                        <article class="ac-text article">
                        <p>
                        ${item.answer}
                        </p>
                        </article>
                        </div>
                  
                    `;
        if (arr.length > 0)
          element.insertAdjacentHTML(
            "afterEnd",
            `<div class="tempChild">${child}</div>`
          );
      });
    }
  };

  //Recursive category component rendering
  return (
    <>
      {child != null &&
        child.length > 0 &&
        child.map((y) => (
          <div key={y.id} className="ac-text ml-2" myid={y.id}>
            <div className="ac-sub">
              <input
                onClick={insertQuestions}
                className="ac-input"
                id={y.id}
                name={y.id}
                type="checkbox"
              />
              <label className="ac-label" htmlFor={y.id}>
                {y.title}
              </label>
              <Accordion
                msg={y.title}
                id={y.id}
                parentid={y.parentId}
                iteration={++iteration}
                child={y.children != null ? y.children : y}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default Accordion;
