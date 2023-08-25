package com.softeer.mycarchiving.ui.myarchive.made

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.paging.compose.LazyPagingItems
import com.softeer.mycarchiving.model.myarchive.MadeCarUiModel
import com.softeer.mycarchiving.ui.component.MadeCarItem
import com.softeer.mycarchiving.ui.component.MoveMakeCarDialog
import com.softeer.mycarchiving.ui.component.MyArchiveLoadingScreen
import com.softeer.mycarchiving.ui.theme.HyundaiLightSand

@Composable
fun MyArchiveMadeScreen(
    modifier: Modifier = Modifier,
    showMoveDialog: Boolean,
    madeCars: LazyPagingItems<MadeCarUiModel>,
    focusedCarFeed: MadeCarUiModel?,
    onDetail: (MadeCarUiModel) -> Unit,
    onClick: () -> Unit,
    openDeleteDialog: (MadeCarUiModel) -> Unit,
    openMoveDialog: (MadeCarUiModel) -> Unit,
    closeMoveDialog: () -> Unit
) {
    when (madeCars.itemCount) {
        0 -> {
            MyArchiveLoadingScreen()
        }
        else -> {
            LazyColumn(
                modifier = modifier
                    .background(HyundaiLightSand),
                verticalArrangement = Arrangement.spacedBy(6.dp),
                state = rememberLazyListState()
            ) {
                items(count = madeCars.itemCount) { index ->
                    madeCars[index]?.run {
                        MadeCarItem(
                            isTempSaved = this.isSaved.not(),
                            modelName = this.modelName,
                            trimName = this.trimName,
                            madeDate = this.lastModifiedDate,
                            trimOptions = this.trimOptions.filterNotNull().joinToString(" / "),
                            selectedOptions = this.selectedOptions,
                            onItemClick = {
                                if (this.isSaved) {
                                    onDetail(this)
                                    onClick()
                                } else {
                                    openMoveDialog(this)
                                }
                            },
                            onDelete = { openDeleteDialog(this) }
                        )
                    }
                }
            }
        }
    }
    if (showMoveDialog) {
        MoveMakeCarDialog(onDismissRequest = closeMoveDialog, onMove = {}, saveDate = focusedCarFeed!!.lastModifiedDate)
    }
}
