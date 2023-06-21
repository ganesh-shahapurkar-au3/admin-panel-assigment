import { Request, Response } from "express";
import { AppDataSource } from "../db/AppDataSource";
import { Product } from "../Entity/Prodcut";
import { v4 as uuidv4 } from "uuid";

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    let imagesArray: { fileName: string; url: string; id: string }[] = [];
    if (files) {
      imagesArray = files.map((image) => ({
        fileName: image.filename,
        url: image.path,
        id: uuidv4(),
      }));
    }

    const dto: Partial<Product> = {
      product_name: req.body.productName,
      product_price: req.body.price,
      product_SKU: req.body.sku,
      product_images: imagesArray,
    };

    const product = AppDataSource.getRepository(Product).create(dto);
    const results = await AppDataSource.getRepository(Product).save(product);
    res.status(201).json({
      success: true,
      message: "Product added successfully successfully",
      results,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await AppDataSource.getRepository(Product).find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await AppDataSource.getRepository(Product).findOneBy({
      id: Number(req.params.id),
    });
    if (product) {
      res.status(200).json({ success: true, product: product });
    } else {
      res.status(200).json({ success: false, product: {} });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await AppDataSource.getRepository(Product).delete(
      req.params.id
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];

    let imagesArray: { fileName: string; url: string; id: string }[] = [];

    if (files) {
      imagesArray = files.map((image, index) => {
        return { fileName: image.filename, url: image.path, id: uuidv4() };
      });
    }

    const product = await productRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (product) {
      const dto = {
        product_name: req.body.productName,
        product_price: req.body.price,
        product_SKU: req.body.sku,
        product_images: [...product.product_images, ...imagesArray],
      };
      Object.assign(product, dto);
      productRepository.update(id, product);
      res
        .status(200)
        .json({ success: true, message: "Updated Successfully", product });
    } else {
      res.status(200).json({ success: false, message: "Product Not Found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteProductsImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const { id, imageId } = req.params;
    const product = await productRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (product) {
      const dto = {
        product_images: product.product_images.filter(
          (image) => image.id !== imageId
        ),
      };
      Object.assign(product, dto);
      productRepository.update(id, product);
      res.status(200).json({ success: true, message: "Deleted Successfully" });
    } else {
      res.status(200).json({ success: false, message: "Product Not Found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
