import 'isomorphic-fetch';
import moment from 'moment';
import sscache from 'session-storage-cache';
import deserialize from './model';

async function getResume() {
  /*
  TODO: implement
  const response = await fetch('//api.mauro-colella.com/skills');
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const dataSet = await response.json();
  */
  let data = sscache.get('resumeData');
  if (!data) {
    const dataSet = {
      data: [
        {
          id: '1',
          type: 'resumeEntry',
          attributes: {
            company: 'ACME Inc',
            description: 'Some good job.',
            startDate: moment().format('l'),
            endDate: moment().format('l'),
          },
          relationships: [
            {
              type: 'tasks',
              data: [
                {
                  type: 'task',
                  id: '1',
                },
                {
                  type: 'task',
                  id: '2',
                },
              ],
            },
          ],
        },
        {
          id: '2',
          type: 'resumeEntry',
          attributes: {
            company: 'MEGA Inc',
            description: 'Some really good job.',
            startDate: moment().format('l'),
            endDate: moment().format('l'),
          },
          relationships: [
            {
              type: 'tasks',
              data: [
                {
                  type: 'task',
                  id: '2',
                },
                {
                  type: 'task',
                  id: '1',
                },
              ],
            },
          ],
        },
        {
          id: '3',
          type: 'resumeEntry',
          attributes: {
            company: 'ACME Inc',
            description: 'Some good job.',
            startDate: moment().format('l'),
            endDate: moment().format('l'),
          },
          relationships: [
            {
              type: 'tasks',
              data: [
                {
                  type: 'task',
                  id: '1',
                },
                {
                  type: 'task',
                  id: '2',
                },
              ],
            },
          ],
        },
        {
          id: '4',
          type: 'resumeEntry',
          attributes: {
            company: 'MEGA Inc',
            description: 'Some really good job.',
            startDate: moment().format('l'),
            endDate: moment().format('l'),
          },
          relationships: [
            {
              type: 'tasks',
              data: [
                {
                  type: 'task',
                  id: '2',
                },
                {
                  type: 'task',
                  id: '1',
                },
              ],
            },
          ],
        },
        {
          id: '5',
          type: 'resumeEntry',
          attributes: {
            company: 'ACME Inc',
            description: 'Some good job.',
            startDate: moment().format('l'),
            endDate: moment().format('l'),
          },
          relationships: [
            {
              type: 'tasks',
              data: [
                {
                  type: 'task',
                  id: '1',
                },
                {
                  type: 'task',
                  id: '2',
                },
              ],
            },
          ],
        },
        {
          id: '6',
          type: 'resumeEntry',
          attributes: {
            company: 'MEGA Inc',
            description: 'Some really good job.',
            startDate: moment().format('l'),
            endDate: moment().format('l'),
          },
          relationships: [
            {
              type: 'tasks',
              data: [
                {
                  type: 'task',
                  id: '2',
                },
                {
                  type: 'task',
                  id: '1',
                },
              ],
            },
          ],
        },
      ],
      included: [
        {
          id: '1',
          type: 'task',
          attributes: {
            description: 'Lorem ipsum.',
          },
        },
        {
          id: '2',
          type: 'task',
          attributes: {
            description: 'Dolor amet.',
          },
        },
      ],
    };

    data = deserialize(dataSet);
    sscache.set('resumeData', data, 5);
  }

  return data;
}

export default getResume;
