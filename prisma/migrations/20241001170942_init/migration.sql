-- CreateTable
CREATE TABLE `Brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(100) NOT NULL,
    `img` VARCHAR(100) NOT NULL,
    `city` VARCHAR(20) NOT NULL,
    `release_year` INTEGER NOT NULL,
    `p_condition` VARCHAR(20) NOT NULL,
    `delivery_status` VARCHAR(20) NOT NULL,
    `isSold` BOOLEAN NOT NULL DEFAULT false,
    `price` INTEGER NOT NULL,
    `brand_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `Brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
