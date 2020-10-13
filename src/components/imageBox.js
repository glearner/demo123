import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { metaDataUpdate } from "../actions/index";

const ImageBox = ({ data }) => {
  let subImageData = "";
  let subImageUpSellData = "";
  const dispatch = useDispatch();

  let metaData =
    useSelector((state) => {
      return state.metaData.data;
    }) || {};

  let vendor = useSelector(
    (state) =>
      state?.filter?.vendor || localStorage.getItem("vendor") || "uniqlo-in"
  );

  const id = data.itemcode;

  const [subDataCrossSell, setSubDataCrossSell] = useState([]);
  const [subDataUpSell, setSubDataUpSell] = useState([]);

  data["cross-sell"].map((i) => {
    subImageData += i + ",";
  });

  data["up-sell"].map((i) => {
    subImageUpSellData += i + ",";
  });

  useEffect(() => {
    axios
      .get(`/${vendor}/items`, {
        params: { apparel_id: subImageData, primary_key: "itemcode" },
      })
      .then((data) => {
        setSubDataCrossSell(data.data);
      });

    axios
      .get(`/${vendor}/items`, {
        params: { apparel_id: subImageUpSellData, primary_key: "itemcode" },
      })
      .then((data) => {
        setSubDataUpSell(data.data);
      });
  }, []);

  const onDragEnd = (results) => {
    const { destination, source, reason } = results;
    if (!destination || reason === "CANCEL") return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newCrossSell = [...subDataCrossSell];
    const droppedSell = newCrossSell[source.index];

    newCrossSell.splice(source.index, 1);
    newCrossSell.splice(destination.index, 0, droppedSell);
    let newMetaData = metaData[id];
    let idCrossSell = [];
    newCrossSell.map((i) => idCrossSell.push(i.itemcode));
    newMetaData["cross-sell"] = [...idCrossSell];
    metaData[id] = newMetaData;
    dispatch(metaDataUpdate(metaData));
    setSubDataCrossSell([...newCrossSell]);
  };

  const onDragEndUpSell = (results) => {
    const { destination, source, reason } = results;
    if (!destination || reason === "CANCEL") return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newUpSell = [...subDataUpSell];
    const droppedSell = newUpSell[source.index];

    newUpSell.splice(source.index, 1);
    newUpSell.splice(destination.index, 0, droppedSell);
    setSubDataUpSell([...newUpSell]);
    let newMetaData = metaData[id];
    let idUpSell = newUpSell.map((i) => i.itemcode);
    newMetaData["up-sell"] = [...idUpSell];
    metaData[id] = newMetaData;
    dispatch(metaDataUpdate(metaData));
  };

  const removeImage = (data, type) => {
    if (type == "cross-sell") {
      let locData = subDataCrossSell.filter(
        (d) => data.itemcode !== d.itemcode
      );
      setSubDataCrossSell(locData);
    } else {
      let locData = subDataUpSell.filter((d) => data.itemcode !== d.itemcode);
      setSubDataUpSell(locData);
    }
  };

  return (
    <div className="flex-box">
      <img className="box-image-wrapper" src={data.image_url} />
      <div style={{ margin: "1rem" }}>
        <div>
          <div style={{ margin: "2rem" }}>Cross Sell</div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={data.id} direction="horizontal">
              {(provided) => {
                return (
                  <div
                    className="box-image-box-wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {subDataCrossSell.length == 0 && (
                      <div style={{ textAlign: "center", margin: "1rem 3rem" }}>
                        No content to show
                      </div>
                    )}
                    {subDataCrossSell.length > 0 &&
                      subDataCrossSell.map((i, index) => {
                        return (
                          <Draggable
                            key={i.id}
                            draggableId={i.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div style={{ position: "relative" }}>
                                  <div
                                    className="close-btn"
                                    onClick={() => removeImage(i, "cross-sell")}
                                  >
                                    X
                                  </div>
                                  <img
                                    className="flex-subimage-wrapper"
                                    src={i.image_url}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>

        <div>
          <div style={{ margin: "2rem" }}> Up Sell</div>

          <DragDropContext onDragEnd={onDragEndUpSell}>
            <Droppable droppableId={data.id} direction="horizontal">
              {(provided) => {
                return (
                  <div
                    className="box-image-box-wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {subDataUpSell.length == 0 && (
                      <div style={{ textAlign: "center", margin: "1rem 3rem" }}>
                        No content to show
                      </div>
                    )}
                    {subDataUpSell.length > 0 &&
                      subDataUpSell.map((i, index) => {
                        return (
                          <Draggable
                            key={i.id}
                            draggableId={i.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div style={{ position: "relative" }}>
                                  <div
                                    className="close-btn"
                                    onClick={() => removeImage(i, "up-sell")}
                                  >
                                    X
                                  </div>
                                  <img
                                    className="flex-subimage-wrapper"
                                    src={i.image_url}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
