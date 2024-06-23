import React, {
  useCallback,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsByOrgId } from "actions/sheduller";
import {
  Col,
  Radio,
  Flex,
  Space,
  DatePicker,
  Button,
} from "antd";
import { useParams } from "react-router-dom";
import { LessonInfo } from "components/Modals/LessonInfo";
import { LessonsListModal } from "components/Modals/LessonsList";
import dayjs from "dayjs";
import 'moment/locale/ru';
import {
  timeList,
  ViewTypes,
  dateFormat,
} from "constants";
import {
  StyledCol,
  StyledColBackground,
  StyledRow,
  StyledColBordered,
  StyledLayoutCalendar,
  StyledLayout,
  StyledContent,
} from './styled';


import { getCurrentWeek } from "./utils";
import { AddEventOrgModal } from "components/Modals/AddEventOrg";

export const Calendar = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { events } = useSelector((state) => state.events);

  const [view, setView] = useState(ViewTypes[0]);
  const [currentDate, setCurrentDate] = useState(dayjs(dayjs(), dateFormat));
  const [lessonsInModal, setLessonsInModal] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  // modals state
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showCurrentLesson, setShowCurrentLesson] = useState(false);
  const [showModalLessons, setShowModalLessons] = useState(false);

  useEffect(() => {
    dispatch(getEventsByOrgId(params.id));
  }, [dispatch, params.id]);

  // handlers
  const handleContentClick = useCallback((lessons) => {
    setLessonsInModal(lessons);
    setShowModalLessons(true);
  }, []);

  const handleLessonInfoClick = useCallback((lesson) => {
    setCurrentLesson(lesson);
    setShowCurrentLesson(true);
    setShowModalLessons(false);
  }, []);

  const handleCloseCurrentLesson = useCallback(() => {
    setShowCurrentLesson(false);
    setShowModalLessons(true);
  }, []);

  const handleShowAddEventModal = useCallback(() => {
    setShowAddEventModal(true);
  }, []);

  const handleCloaseAddEventModal = useCallback(() => {
    setShowAddEventModal(false);
  }, []);

  // halpers
  const findLesson = useCallback((day, time, isTimeEqual) => {
    return  events.filter(item => {
      const timeStart = item.time_start;
      const timeEnd = item.time_end;
      const dateStart = dayjs(item.date_start, dateFormat).format(dateFormat);
      const dateEnd = dayjs(item.date_end, dateFormat).format(dateFormat);
      const isCorrectDate = dateStart <= day?.fullDay.format(dateFormat) && dateEnd >= day?.fullDay.format(dateFormat)
      const isTimeCorrect = isTimeEqual ? timeStart === time : (timeStart <= time) && (timeEnd > time);
      if (isCorrectDate) {
        console.log(isCorrectDate, isTimeCorrect);
        console.log(dateEnd, dateStart, day?.fullDay.format(dateFormat), timeStart, time)
      }
      return (isCorrectDate && isTimeCorrect)
    })
  }, [events]);

  // content
  const getLessonInfo = useCallback((day, time) => {
    const lesson = findLesson(day, time, true);
    const additionalCell = findLesson(day, time, false);
    if (lesson.length) {
      return (
        <StyledContent
          onClick={() => handleContentClick(lesson)}
        >{lesson.length === 1 ? lesson[0].lesson : `${lesson[0].lesson}, (${lesson.length})`}</StyledContent>
      )
    } else if (additionalCell.length) {
      return (
        <StyledContent
          onClick={() => handleContentClick(additionalCell)}
        />
      )
    } else {
      return (
        <div></div>
      )
    }
  }, [findLesson, handleContentClick]);

  return (
    <StyledLayout gap="20px" vertical>
      <Flex justify="space-between" align="center">
        <Space direction="horizontal">
            <Radio.Group onChange={(value) => setView(value.target.value)} defaultValue={ViewTypes[0]}>
              {ViewTypes.map((item, index) => (
                <Radio.Button key={index} value={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
            <DatePicker defaultValue={currentDate} onChange={setCurrentDate} picker="week" />
        </Space>
        <Space direction="horizontal">
          <Button onClick={handleShowAddEventModal}>Добавить событие</Button>
        </Space>
      </Flex>
      {view === ViewTypes[0] && (
        <StyledLayoutCalendar>
          <StyledRow>
            <Col span={3}></Col>
            {getCurrentWeek(currentDate).map((day, index) => (
              <StyledColBackground span={3} key={index}>
                <div>{day.formatedDay}</div>
              </StyledColBackground>
            ))}
          </StyledRow>
          {timeList.map((time, index) => (
            <StyledRow key={index}>
              <StyledCol span={3}>{time}</StyledCol>
              {getCurrentWeek(currentDate).map((day, index) => (
                <StyledColBordered span={3} key={index}>
                  {getLessonInfo(day, time)}
                </StyledColBordered>
              ))}
            </StyledRow>
          ))}
        </StyledLayoutCalendar>
      )}
      <AddEventOrgModal
        handleCancel={handleCloaseAddEventModal}
        open={showAddEventModal}
      />
      <LessonsListModal
        setShowModalLessons={setShowModalLessons}
        showModalLessons={showModalLessons}
        lessonsInModal={lessonsInModal}
        handleLessonInfoClick={handleLessonInfoClick}
      />
      {currentLesson &&
        <LessonInfo
          lesson={currentLesson}
          open={showCurrentLesson}
          handleOk={handleCloseCurrentLesson}
          handleCancel={handleCloseCurrentLesson}
        />
      }
    </StyledLayout>
  )
}