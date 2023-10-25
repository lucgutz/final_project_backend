import { Router } from 'express';
import getProperties from '../services/properties/getProperties.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import createProperty from '../services/properties/createProperty.js';
import updatePropertyById from '../services/properties/updateProperyById.js';
import deletePropertyById from '../services/properties/deletePropertyById.js';

import auth from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties(location, pricePerNight, amenities);
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res
        .status(404)
        .json({ message: `Property with id ${id} was not found!` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const property = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });

    if (property) {
      res.status(200).send({
        message: `Successfully updated property with id ${id}`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyById(id);

    if (property) {
      res.status(200).send({
        message: `Successfully deleted property with id ${id}`,
        property,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} was not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
