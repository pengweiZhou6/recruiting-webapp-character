import React, { useState } from "react"
import { CLASS_LIST } from "../../constants/consts"

const ClassView = ({ character }) => {
  const [selectedClass, setSelectedClass] = useState(null)

  const handleClassClick = (className) => {
    setSelectedClass((prevClass) =>
      prevClass === className ? null : className
    )
  }

  return (
    <div>
      <h2>Classes</h2>
      <div>
        {Object.keys(CLASS_LIST).map((className) => (
          <div key={className}>
            <div
              className={
                character.activeClass.includes(className) ? "classActive" : ""
              }
              onClick={() => handleClassClick(className)}
            >
              {className}
            </div>
            {selectedClass === className && (
              <div>
                <h4>{className} Attribute Requirements:</h4>
                <div>
                  {Object.entries(CLASS_LIST[className]).map(
                    ([attribute, value]) => (
                      <div key={attribute}>
                        {attribute}: {value}
                      </div>
                    )
                  )}
                </div>
                <button onClick={() => setSelectedClass(null)}>
                  Hide Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassView
