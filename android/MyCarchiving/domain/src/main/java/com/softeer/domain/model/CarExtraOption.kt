package com.softeer.domain.model

data class CarExtraOption(
    val isAvailable: Boolean?,
    val id: String,
    val name: String,
    val imageUrl: String,
    val price: Int,
    val tags: List<String>?,
    val subOptions: List<CarExtraSubOption>
)

data class CarExtraSubOption(
    val id: String,
    val name: String,
    val imageUrl: String,
    val description: String,
)