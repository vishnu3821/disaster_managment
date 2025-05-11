import { Disaster } from '../contexts/DisasterContext';

// Mock disaster database
const disasters: Disaster[] = [
  {
    id: '1',
    title: 'Flash Flood on Main Street',
    description: 'Sudden flash flood has affected several homes along Main Street. Water level is rising and some residents are stranded.',
    type: 'flood',
    severity: 'high',
    location: {
      address: '123 Main St, Riverside, CA 92501',
      coordinates: {
        lat: 33.980,
        lng: -117.375
      }
    },
    status: 'pending',
    reportedBy: {
      id: '1',
      name: 'John Doe'
    },
    reportedAt: new Date('2023-05-10T08:30:00'),
    updatedAt: new Date('2023-05-10T08:30:00')
  },
  {
    id: '2',
    title: 'Apartment Fire on Oak Avenue',
    description: 'Fire broke out in a 3rd floor apartment. Building has been evacuated but there might still be people trapped inside.',
    type: 'fire',
    severity: 'critical',
    location: {
      address: '456 Oak Ave, Springfield, IL 62701',
      coordinates: {
        lat: 39.801,
        lng: -89.644
      }
    },
    status: 'accepted',
    reportedBy: {
      id: '1',
      name: 'John Doe'
    },
    assignedTo: {
      id: '2',
      name: 'Jane Smith'
    },
    reportedAt: new Date('2023-05-09T21:15:00'),
    updatedAt: new Date('2023-05-09T21:30:00')
  },
  {
    id: '3',
    title: 'Hurricane Damage in Coastal Area',
    description: 'Hurricane Maria has caused significant damage to homes in the coastal area. Multiple families have lost their homes and need immediate shelter.',
    type: 'hurricane',
    severity: 'high',
    location: {
      address: '789 Beach Rd, Miami, FL 33139',
      coordinates: {
        lat: 25.782,
        lng: -80.131
      }
    },
    status: 'pending',
    reportedBy: {
      id: '3',
      name: 'Alex Johnson'
    },
    reportedAt: new Date('2023-05-08T16:45:00'),
    updatedAt: new Date('2023-05-08T16:45:00')
  },
  {
    id: '4',
    title: 'Minor Earthquake Damage',
    description: 'Small earthquake has caused some structural damage to older buildings. No injuries reported but some buildings need assessment.',
    type: 'earthquake',
    severity: 'medium',
    location: {
      address: '101 First Ave, San Francisco, CA 94105',
      coordinates: {
        lat: 37.789,
        lng: -122.401
      }
    },
    status: 'resolved',
    reportedBy: {
      id: '1',
      name: 'John Doe'
    },
    assignedTo: {
      id: '2',
      name: 'Jane Smith'
    },
    reportedAt: new Date('2023-05-07T09:10:00'),
    updatedAt: new Date('2023-05-07T15:30:00')
  }
];

// Get all disasters
export const getDisasters = async (): Promise<Disaster[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve([...disasters]);
    }, 800);
  });
};

// Get a single disaster by ID
export const getDisasterById = async (id: string): Promise<Disaster> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const disaster = disasters.find(d => d.id === id);
      
      if (disaster) {
        resolve({...disaster});
      } else {
        reject(new Error('Disaster not found'));
      }
    }, 600);
  });
};

// Create a new disaster
export const createDisaster = async (
  disasterData: Omit<Disaster, 'id' | 'status' | 'reportedAt' | 'updatedAt'>
): Promise<Disaster> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const newDisaster: Disaster = {
        id: (disasters.length + 1).toString(),
        ...disasterData,
        status: 'pending',
        reportedAt: new Date(),
        updatedAt: new Date()
      };
      
      // Add to "database"
      disasters.push(newDisaster);
      
      resolve({...newDisaster});
    }, 1200);
  });
};

// Update disaster status
export const updateDisasterStatus = async (
  id: string, 
  newStatus: Disaster['status'],
  volunteerId?: string
): Promise<Disaster> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const disasterIndex = disasters.findIndex(d => d.id === id);
      
      if (disasterIndex === -1) {
        reject(new Error('Disaster not found'));
        return;
      }
      
      const disaster = {...disasters[disasterIndex]};
      
      // Update status
      disaster.status = newStatus;
      disaster.updatedAt = new Date();
      
      // If accepted by a volunteer, add volunteer info
      if (newStatus === 'accepted' && volunteerId) {
        // In a real app, we would look up the volunteer's name
        const volunteerName = volunteerId === '2' ? 'Jane Smith' : 'Volunteer';
        
        disaster.assignedTo = {
          id: volunteerId,
          name: volunteerName
        };
      }
      
      // Update in "database"
      disasters[disasterIndex] = disaster;
      
      resolve({...disaster});
    }, 800);
  });
};