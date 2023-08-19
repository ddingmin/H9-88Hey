package com.softeer.domain.repository

import com.softeer.domain.model.CarColor
import kotlinx.coroutines.flow.Flow

interface SelectColorRepository {
    fun getCarColors(): Flow<List<CarColor>>
}