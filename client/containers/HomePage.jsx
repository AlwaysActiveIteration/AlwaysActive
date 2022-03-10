import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import SideBarContainer from './SideBarContainer';
import EventsContainer from './EventsContainer';
import { useLocation } from 'react-router-dom';
import EventBox from '../components/EventBox';

let counter = 0;

function HomePage(props) {
  const { state } = useLocation();
  const [formOpened, setForm] = useState(false);
  const [eventsArr, setEventsArr] = useState([1,2]);
  const [eventSaved, setEventSaved] = useState(false);
  // console.log(state);

  

  const getEvents = async () => {
    let data = [];
    console.log('before', eventsArr)
    try {
      const response = await fetch('/events', {method: 'PUT', body: JSON.stringify({username: state}), headers: { 'Content-Type': 'application/json' } });
      data = await response.json();
      await setEventsArr(data);
      console.log('inside', eventsArr);
    } catch (error) {
      console.log('error:', error);
    }
    console.log('after', eventsArr);
    console.log('from getEvents', eventsArr)
  };
 

  // const getEvents = async () => {
  //   // let data;
  //   const response = await fetch('/events', {method: 'PUT', body: JSON.stringify({username: state}), headers: { 'Content-Type': 'application/json' } });
  //   const data = await response.json();
  //   setEventsArr(data);
  // };

  const getFilteredEvents = async (city, stateF) => {
    const response = await fetch('/filter', {
      method: 'POST',
      body: JSON.stringify({ username: state, city: city, state: stateF }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setEventsArr(data);
    console.log('from getFilteredEvents:', eventsArr);
  };

  const toggleRsvp = (index, status) => {
    const newArr = [...eventsArr];
    newArr[index].userstatus = status;
    setEventsArr(newArr);
    console.log('from getFilteredEvents:', eventsArr);
  };

  console.log('initialize events')
  let events = [];

  // let events = [<EventBox
  //   key="eventBox20"
  //   index={20}
  //   name="Bob"
  //   city="Test"
  //   state="Test1"
  //   description="Test2"
  //   owner="Test3"
  //   eventId={20}
  //   rsvpStatus="Test4"
  //   user="Test5"
  //   date={20}
  //   time={20}
  //   // getEvents={getEvents}
  //   toggleRsvp={toggleRsvp}
  // />];

  while (counter < 1) {
    getEvents();
    counter += 1;
    console.log('inside while loop', eventsArr);
  }

  // useEffect(async () => await getEvents(), []);

  console.log('before for loop', eventsArr)
  for (let i = 0; i < eventsArr.length; i++) {
    console.log('inside for loop', eventsArr);
    const dateObj = new Date(eventsArr[i].time);
    events.push(<EventBox
      key={`eventBox${i}`}
      index={i}
      name={eventsArr[i].name}
      city={eventsArr[i].city}
      state={eventsArr[i].state}
      description={eventsArr[i].description}
      owner={eventsArr[i].username}
      eventId={eventsArr[i]._id}
      rsvpStatus={eventsArr[i].userstatus}
      user={state}
      date={dateObj.toLocaleDateString()}
      time={dateObj.toLocaleTimeString()}
      // getEvents={getEvents}
      toggleRsvp={toggleRsvp}
    />);
  }

  return (
    <div>
      <div id="ContainerParent">
        {/* <SideBarContainer username={state} formOpened={formOpened} setForm={setForm} getEvents={getEvents} getFilteredEvents={getFilteredEvents} /> */}
        <EventsContainer key='asf' events={events} />
      </div>
    </div>
  );
}

export default HomePage;