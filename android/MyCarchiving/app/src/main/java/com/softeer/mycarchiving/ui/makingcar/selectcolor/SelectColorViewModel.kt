package com.softeer.mycarchiving.ui.makingcar.selectcolor

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.softeer.domain.model.CarExteriorColor
import com.softeer.domain.model.CarInteriorColor
import com.softeer.domain.usecase.makingcar.GetCarColorsUseCase
import com.softeer.mycarchiving.mapper.asUiModel
import com.softeer.mycarchiving.model.makingcar.ColorOptionUiModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

private const val IMAGE_COUNT = 60

private val TAG = SelectColorViewModel::class.simpleName

@HiltViewModel
class SelectColorViewModel @Inject constructor(
    getColorsUseCase: GetCarColorsUseCase
) : ViewModel() {

    init {
        viewModelScope.launch {
            getColorsUseCase().collect { colors ->
                if (colors.isNotEmpty()) {
                    when (colors.first()) {
                        is CarExteriorColor -> {
                            _exteriors.value = colors.map { color ->
                                color as CarExteriorColor
                                _imageUrls.value = _imageUrls.value + listOf(color.carImagePath)
                                color.asUiModel()
                            }
                        }
                        is CarInteriorColor -> {
                            _interiors.value = colors.map { color ->
                                color as CarInteriorColor
                                _interiorImageUrls.value = _interiorImageUrls.value + listOf(color.carImageUrl)
                                color.asUiModel()
                            }
                        }
                    }
                }
            }
        }
    }

    private val _exteriors = MutableStateFlow<List<ColorOptionUiModel>>(emptyList())
    val exteriors: StateFlow<List<ColorOptionUiModel>> = _exteriors

    private val _interiors = MutableStateFlow<List<ColorOptionUiModel>>(emptyList())
    val interiors: StateFlow<List<ColorOptionUiModel>> = _interiors

    private val _imageUrls = MutableStateFlow<List<String>>(emptyList())
    val imageUrls: StateFlow<List<String>> = _imageUrls

    private val _interiorImageUrls = MutableStateFlow<List<String>>(emptyList())
    val interiorImageUrls: StateFlow<List<String>> = _interiorImageUrls

    private val _topImageIndex = MutableStateFlow(0)
    val topImageIndex: StateFlow<Int> = _topImageIndex

    private val _selectedIndex = MutableStateFlow(0)
    val selectedIndex: StateFlow<Int> = _selectedIndex

    private val _category = MutableStateFlow("외장 색상")
    val category: StateFlow<String> = _category

    fun changeTopImageIndex(beAdded: Boolean) {
        _topImageIndex.value =
            if (beAdded) {
                (_topImageIndex.value + 1).mod(IMAGE_COUNT)
            } else {
                (_topImageIndex.value - 1).mod(IMAGE_COUNT)
            }
    }

    fun changeSelectedColor(selected: Int) {
        _selectedIndex.value = selected
    }

    fun changeCategory(screenProgress: Int) {
        _category.value = when (screenProgress) {
            0 -> "외장 색상"
            1 -> "내장 색상"
            else -> ""
        }
    }
}